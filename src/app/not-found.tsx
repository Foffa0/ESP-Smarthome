import Link from 'next/link'
 
export default async function NotFound() {

  return (
    <div>
      <h2 className='text-white'>Not Found</h2>
      <p className='text-white'>Could not find requested resource</p>
      <Link href="/" className='text-white'>Return Home</Link>
    </div>
  )
}