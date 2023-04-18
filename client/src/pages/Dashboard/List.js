import React from "react"

const List = ({ list }) => (
    <ul>
        {list.map(item => (
            <ListItems key={item.id} items={item}/>
        ))}
    </ul>
)

const ListItems = ({ items }) => (
    <li>
        <div>{items.id}</div>
        <div>{items.username }</div>
        <div>{items.description}</div>
    </li>
)

export default List;