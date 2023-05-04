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
        <div><h4>{items.id} {items.username }</h4></div>
        <div>{items.description}</div>
        {items.description ? <CourseButton id={items.id} students={items.student_ids} /> : <></>}
    </li>
)

export default List;