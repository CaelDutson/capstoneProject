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
    <li className="courseList">
        <div>{items.name}</div>
        <div>{items.description}</div>
        <div>{items.start_date.slice(0,10)} - {items.end_date.slice(0,10)}</div>
        <div>{items.student_ids.length}/{items.max_size}</div>
        {items.description ? <CourseButton id={items.id} students={items.student_ids} /> : <></>}
    </li>
)

export default List;