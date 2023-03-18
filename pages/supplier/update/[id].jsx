import Head from "next/head"
import Link from "next/link"

// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Supplier({ Supplier }) {
  console.log('supplier 2', Supplier)
  if (!Supplier) return (
    <div>
      <p>supplier not found</p>
      <Link href="/supplier">Back</Link>
      </div>
  );

  return (
    <>
      <Head>
        <title>{Supplier.name}</title>
      </Head>
      <h1>{Supplier.name}</h1>
      <p>{Supplier.address}</p>
      <Link href="/supplier">Back</Link>
    </>
  )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res = await fetch(`https://final-exam-728u-29vqi1t5l-haiao123.vercel.app/api/supplier/suppliers/${params.id}`)
  const supplier = await res.json()
  console.debug('supplier 1', supplier)
  return { props: { supplier } }
}