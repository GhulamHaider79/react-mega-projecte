import React, {useEffect, useState} from 'react'
import { Container, PostCard, PostForm } from '../components'
import databaseService from '../appWrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()


   useEffect(() => {
    if (slug) {
        databaseService.getPosts(slug).then((post) => {
            if (post) {
                setPost(post)
            }
        })
    }else {
        navigate('/')
    }
   }, [])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost