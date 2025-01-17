import React, {useState} from 'react'
import {Redirect} from 'react-router'
import {savePost} from './api'

function Editor({user}) {
  const [isSaving, setIsSaving] = useState(false)
  const [redirect, setRedirect] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map((t) => t.trim()),
      authorId: user.id,
    }
    setIsSaving(true)
    await savePost(newPost)
    setRedirect(true)
  }
  if (redirect) {
    return <Redirect to="/" />
  }
  return (
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
