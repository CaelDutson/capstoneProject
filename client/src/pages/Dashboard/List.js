import React from "react"

const List = ({ list }) => (
    <ul>
        {list.map(item => (
            <ListItems key={item.id} items={item}/>
        ))}
    </ul>
)

const ListItems = ({ items }) => (
    <li className="courseList">
        <div><h4>{items.id} {items.username }</h4></div>
        <div>{items.description}</div>
    </li>
)

export default List;