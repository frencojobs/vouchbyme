import Image from 'next/image'

type Props = {
  src: string
}

export const Avatar: React.FC<Props> = ({ src }) => {
  return (
    <div className="relative overflow-hidden border border-gray-200 border-solid rounded-full w-28 h-28">
      <Image src={src} alt="Profile picture" layout="fill" objectFit="cover" />
    </div>
  )
}
