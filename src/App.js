import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { useState, useEffect } from 'react';
import './style.css';

//Getting Local Storage Data
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if(lists)
  {
    return JSON.parse(lists);
  }
  else return [];
}

function App() {
  const [inputdata, setInputdata] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // Add Item Function
  const addItem = () => {
    if (!inputdata) {
      alert("Please Enter Data");
    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata
      }
      setItems([...items, myNewInputData]);
      setInputdata("");
    }
  }

  // Delete Item Function
  const deleteItem = (delid) => {
    const updatedItems = items.filter((currentElem) => {
      return delid !== currentElem.id;
    });
    setItems(updatedItems);
  }

  //Edit Item Function
  const editItem = (editid) => {
    const updatingItem = items.find ((currentElem) => {
      return editid === currentElem.id;
    });
    setInputdata(updatingItem.name);
    setIsEditItem(editid);
    setToggleButton(true);
  }

  // Performing Edit Item Function
  const performEdit = () => {
    const updatingItem = items.map((currentElem) => {
      if(currentElem.id === isEditItem)
      {
        return { ...currentElem, name: inputdata};
      }
      return currentElem;
    });
    updatingItem.name = inputdata;
    setItems(updatingItem);
    setIsEditItem("");
    setInputdata("");
    setToggleButton(false);
  }

  // Check All Items
  const checkAllItems = () => {
    setItems([]);
  }

  //Adding in Local Storage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className='img-heading'>
        <img src="https://ivabqohtumjadxnipnsa.supabase.co/storage/v1/object/public/images/To-do-List-image.jpg" alt="nothing found" className='listimage' />
      </div>
      <p className="heading"><i class="bi bi-fire fireIcon"></i> Add your list here <i class="bi bi-fire fireIcon"></i></p><br />
      <div className='list-container'>
        <div>
          <span className="p-input-icon-left p-input-icon-right inputField">
            <i class="bi bi-pencil-fill penIcon"></i>
            <InputText placeholder="Add Item" style={{ width: '100%' }} value={inputdata} onChange={(e) => setInputdata(e.target.value)} />
            {toggleButton ? ( <i class="bi bi-pencil-square performEditIcon" onClick={performEdit}></i> ) : ( <i class="pi pi-plus plusIcon addItem" data-pr-tooltip='Add Item' data-pr-position="right" onClick={addItem}></i> )}
            <Tooltip target=".addItem" className='tooltipVis' style={{ marginLeft: '1%' }} />
          </span>
        </div>
        <div className='listContent'>
          {items.map((currentItem) => (
            <div className='listItem' key={currentItem.id}>
              <div className='listName'>{ currentItem.name }</div>
              <div className='listIcons'>
                <i class="bi bi-pencil-square editIcon" onClick={() => editItem(currentItem.id)}></i>
                <i class="bi bi-trash3-fill deleteIcon" onClick={() => deleteItem(currentItem.id)}></i>
              </div>
            </div>
          ))}
        </div>
        <button className="checkbtn" onClick={checkAllItems}>CHECK LIST</button>
      </div>
    </>
  );
}

export default App;
