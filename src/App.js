import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import './style.css';

function App() {
  return (
    <>
      <div className='img-heading'>
        <img src="https://duiyhomqwkysqswlkipx.supabase.co/storage/v1/object/public/images/To-do-List-image.jpg" alt="nothing found" className='listimage' />
      </div>
      <p className="heading"><i class="bi bi-fire fireIcon"></i> Add your list here <i class="bi bi-fire fireIcon"></i></p><br />
      <div className='list-container'>
        <div>
          <span className="p-input-icon-left p-input-icon-right" style={{ width: '50vh' }}>
            <i class="bi bi-pencil-fill penIcon"></i>
            <InputText placeholder="Add Item" style={{ width: '100%' }} />
            <i class="pi pi-plus plusIcon addItem" data-pr-tooltip='Add Item' data-pr-position="right"></i>
            <Tooltip target=".addItem" style={{ marginLeft: '1%' }} />
          </span>
        </div>
        <div className='listContent'>
          <div className='listItem'>
    
          </div>
          <div className='listItem'>

          </div>
        </div>
        <button className="checkbtn">CHECK LIST</button>
      </div>
    </>
  );
}

export default App;
