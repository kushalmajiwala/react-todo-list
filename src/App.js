import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import './style.css';

const supabase = createClient("https://ivabqohtumjadxnipnsa.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2YWJxb2h0dW1qYWR4bmlwbnNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NTQyMTI0MywiZXhwIjoyMDAwOTk3MjQzfQ.X41oJJSXkbe1kRkFm_1UyufrUN_wHwHVHe_xz3HF72A");

function App() {
  const [inputdata, setInputdata] = useState("");
  const [items, setItems] = useState([]);
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // Add Item Function
  const addItem = async () => {
    if (!inputdata) {
      alert("Please Enter Data");
    }
    else {
      const insertData = {
        id: new Date().getTime(),
        item_name: inputdata
      }
      const { error } = await supabase.from("list_items").insert(insertData);
      if(error) throw error;
      setInputdata("");
      getListData();
    }
  }

  // Delete Item Function
  const deleteItem = async (delid) => {
    const { error } = await supabase.from("list_items").delete().eq('id', delid);
    if(error) throw error;
    getListData();
  }

  //Edit Item Function
  const editItem = (editid) => {
    const updatingItem = items.find((currentElem) => {
      return editid === currentElem.id;
    });
    setInputdata(updatingItem.item_name);
    setIsEditItem(editid);
    setToggleButton(true);
  }

  // Performing Edit Item Function
  const performEdit = async () => {
    const { error } = await supabase.from("list_items").update({ item_name: inputdata }).eq('id', isEditItem);
    if(error) throw error;
    getListData();
    setIsEditItem("");
    setInputdata("");
    setToggleButton(false);
  }

  // Check All Items
  const checkAllItems = async () => {
    const { error } = await supabase.from("list_items").delete().neq("id", 0);
    if(error) throw error;
    getListData();
  }

  //Adding in Local Storage
  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    const { data } = await supabase.from("list_items").select().order('id', { ascending: false });
    setItems(data);
  }

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
            {toggleButton ? (<i class="bi bi-pencil-square performEditIcon" onClick={performEdit}></i>) : (<i class="pi pi-plus plusIcon addItem" data-pr-tooltip='Add Item' data-pr-position="right" onClick={addItem}></i>)}
            <Tooltip target=".addItem" className='tooltipVis' style={{ marginLeft: '1%' }} />
          </span>
        </div>
        <div className='listContent'>
          {items.map((currentItem) => (
            <div className='listItem' key={currentItem.id}>
              <div className='listName'>{currentItem.item_name}</div>
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
