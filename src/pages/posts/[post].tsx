import { Post } from '.'

export default function post({ post }: { post: Post }) {
  return (
    <div>
      <h1 className='text-3xl font-bold underline text-orange-600	'>POST(投稿){post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  )
}

export async function getServerSideProps({ params }: { params: any }) {
  console.log(process.env.API_KEY)

  const id = params.post
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const post: Post = await res.json()
  if (!Object.keys(post).length) {
    return {
      notFound: true,
    }
  }
  return { props: { post } }
}
