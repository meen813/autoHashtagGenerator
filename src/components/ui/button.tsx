type Props = {
  text: string;
  onClick: () => void;
  red?: boolean
}

export default function Button({ text, red }: Props) {

  return (
    <button className={`border-none w-full rounded-md py-2 px-8 text-white font-bold leading-4 ${red ? 'bg-red-700' : 'bg-blue-700'} hover:bg-blue-900 transition-colors duration-200 `}>
      {text}
    </button>
  )
}