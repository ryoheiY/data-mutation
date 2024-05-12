import { storePost } from '@/lib/posts';
import {redirect} from "next/navigation";
import {FormSubmit} from "@/components/form-submit";
import {useActionState} from "react";

export default function NewPostPage() {

  const actionState = useActionState();

  async function createPost(formData) {
    "use server";
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];

    if( !title || title.trim().length === 0 ) {
      errors.push("Please enter a title");
    }
    if( !content || content.trim().length === 0 ) {
      errors.push("Please enter a content");
    }
    if(!image) {
      errors.push("Please select a image");
    }

    if(errors.length > 0) {
      return { errors };
    }

    await storePost({
      imageUrl: '',
      title,
      content,
      userId: 1
    })

    redirect('/feed');
  }

  return (
    <>
      <h1>Create a new post</h1>
      <form action={createPost}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
      </form>
    </>
  );
}
