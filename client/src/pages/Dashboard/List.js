import React from "react"
import CourseButton from "./CourseButton";

const List = ({ list }) => (
    <ul>
        {list.map(item => (
            <ListItems key={item.id} items={item}/>
        ))}
    </ul>
)

const ListItems = ({ items }) => (
    <li>
        {console.log(items)}
        <div>{items.id}</div>
        <div>{items.username }</div>
        <div>{items.description}</div>
        {items.description ? <CourseButton id={items.id} students={items.student_ids} /> : <></>}
    </li>
)

export default List;