
import React, { useState } from "react";



function Note({ id, title, content, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    const updatedNote = {
      title: updatedTitle,
      content: updatedContent
    };

    onEdit(id, updatedNote);
    setIsEditing(false);
  }

  function handleClick() {
    onDelete(id);
  }

  return (
    <div className="note">
      {isEditing ? (
        <div className="note">
          <input
            type="text"
            value={updatedTitle}
            onChange={(event) => setUpdatedTitle(event.target.value)}
          />
          <textarea
          
            value={updatedContent}
            onChange={(event) => setUpdatedContent(event.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div >
          <h1>{title}</h1>
          <p >{content}</p>
          <button className="b" onClick={handleEdit}>Edit</button>
          <button onClick={handleClick}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Note;

