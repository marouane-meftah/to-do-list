import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { nanoid } from 'nanoid'

export default function App(){
    const [item,setItem] = React.useState("");
    const [items,setItems] = React.useState([]);
    function handleSubmit(e){
        e.preventDefault();
        if(item !==""){

            setItems(prevItems => [...prevItems,{text:item,id:nanoid(),isDone:false}])
            setItem("")
        }
    }
    function deleteItem(id){
        setItems(prevItems => prevItems.filter(item=>item.id !== id ))
    }

    function checkItem(id){
        setItems(prevItems => prevItems.map(item=>item.id !== id? item : {...item,isDone:!item.isDone} ))
    }

    return <>
    <div className="wrapper">
        <div className="list">
        <h1>TO DO LIST</h1>
        <Form
        item={item}
        handleSubmit={handleSubmit}
        setItem={setItem}
        />
        <Items
        items={items}
        item={item}
        deleteItem={deleteItem}
        checkItem={checkItem}
        />
        </div> 
    </div>
    </>
}
function Items({items,checkItem,deleteItem}){
   return <ul className="items">
    {
        items.map(item=>{
            return  <li key={item.id} className={item.isDone ? "item done" : "item"}>
            <span onClick={()=>checkItem(item.id)} className="check-btn"></span>
            <p>{item.text}</p>
            <span onClick={()=>deleteItem(item.id)}><FontAwesomeIcon icon={faTrash} /></span>
        </li>
        })
    }
 
</ul>
} 
function Form({item,handleSubmit,setItem}){
    return <form onSubmit={handleSubmit}>
    <div  className="search-bar">
    <input 
    type="text" 
    placeholder="Add to the list"
    onChange={(e)=>setItem(e.target.value)}
    value={item}
    />
    <button>Add</button>    

    </div>
</form>
}