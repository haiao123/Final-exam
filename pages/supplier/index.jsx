import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home({ supplier }) {

  function deleteBlog(id) {
    fetch(`/api/supplier/suppliers/${id}`,
      {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        // alert("Deleting " + id)
        window.location.reload(false);
      })

  }

  return (
    <>
      <Head>
        <title>supplier</title>
      </Head>
      <h1>supplier</h1>
      <p style={{ margin: '0.4rem' }}>
        <Link href="/supplier/add">+New supplier</Link>
      </p>
      <table><tbody>
        {
          supplier.map(supplier => {
            return (
              <tr key={supplier._id}>
                <td>
                  <Link href={`/supplier/${supplier._id}`}>
                    {supplier.Name}
                  </Link>
                </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td>
                  <Link href={`/supplier/update/${supplier._id}`}>Update</Link>
                  &nbsp;&nbsp;&nbsp;
                  <button onClick={() => deleteBlog(supplier._id)}>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
      <p>
      </p>

    </>
  )
}
export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/supplier/suppliers/`)
  const supplier = await res.json()
  // console.debug('supplier 1', supplier)
  return { props: { supplier } }
}