import React from "react"
import CourseButton from "./CourseButton";

const List = ({ list }) => (
    <>
        {list.map(item => (
            <ListItems key={item.id} items={item}/>
        ))}
    </>
)

const ListItems = ({ items }) => (
    <tr>
        <td>{items.name}</td>
        <td>{items.description}</td>
        <td>{items.start_date.slice(0,10)} - {items.end_date.slice(0,10)}</td>
        <td>{items.student_ids.length}/{items.max_size}</td>
        <td>${items.cost}</td>
        <td>{items.description ? <CourseButton id={items.id} students={items.student_ids} /> : <></>}</td>
    </tr>
)

export default List;