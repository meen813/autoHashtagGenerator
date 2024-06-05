import Link from "next/link";

export default function Header() {

  return (
    <section className="flex justify-start items-center p-4 bg-gradient-header text-white">
      <Link href="/">
        <h1 className="text-2xl font-bold">
          Auto HashTags Generator
        </h1>
      </Link>
    </section>
  )
}