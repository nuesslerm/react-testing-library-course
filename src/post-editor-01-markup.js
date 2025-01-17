import React, {useState} from 'react'
import {savePost} from './api'

function Editor({user}) {
  const [isSaving, setIsSaving] = useState(false)
  function handleSubmit(e) {
    // use e.preventDefault() to prevent a full-page refresh when submitting
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map((t) => t.trim()),
      authorId: user.id,
    }
    // console.log(e.target)
    // const {title, content, tags} = e.target.getElementsByTagName('input')
    setIsSaving(true)
    savePost(newPost)
  }
  // function handleSubmit(e) {
  //   e.preventDefault()
  //   const {title, content, tags} = e.target.elements
  //   const newPost = {
  //     title: title.value,
  //     content: content.value,
  //     tags: tags.value.split(',').map((t) => t.trim()),
  //   }
  //   setIsSaving(true)
  //   savePost(newPost)
  // }
  return (
    // we'll have access to all the elements inside of the form, via event.target of handleSubmit
    // if we give the form elements a name attribute
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" name="title" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" name="content" />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" name="tags" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  )
}

export {Editor}
