import Link from 'next/link'

const index: React.FC<Props> = ({ posts }) => {
  return (
    <div>
      <h1>POST一覧</h1>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`} legacyBehavior>
                <a>{post.title}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default index

export async function getServerSideProps() {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const posts = await res.json()
    console.log(posts)
    return { props: { posts } }
  } catch (error) {
    console.log(error)
  }
}

type Props = {
  posts: Post[]
}

export type Post = {
  userId: string
  id: string
  title: string
  body: string
}
