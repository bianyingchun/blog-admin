import React, { useEffect, useRef } from "react";
import { IEditProps } from "src/types";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();
const Edit: React.FC<IEditProps> = ({ content, handleEditChange }) => {
  const viewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
      if(viewRef && viewRef.current) {
          viewRef.current.innerHTML = md.render(content)
      }
  },[content]);

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if(viewRef && viewRef.current) {
        const value = e.currentTarget.value
        const editStr = md.render(value)
        viewRef.current.innerHTML = editStr
        handleEditChange(value, editStr)
    }
  }

  return (
    <div className="edit">
      <div className="leftbox box">
        <textarea
          defaultValue={content}
          onChange={handleTextareaChange}
          placeholder="编写文章内容[md格式]"
        ></textarea>
      </div>
      <div className="rightbox box" ref={viewRef}></div>
    </div>
  );
};

export default Edit;
