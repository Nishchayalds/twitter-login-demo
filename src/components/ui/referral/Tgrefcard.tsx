import Image from "next/image";

async function Tgrefcard({ number, imageSrc, title, description }: CardProps) {
  return (
    <div className="border border-borderColor text-white p-3 md:backdrop-blur-sm bg-white/5 rounded-lg flex flex-col items-start w-full shadow-lg ">
      <div className="flex items-center w-full  justify-between mb-4">
        <div className="rounded-full">
          <Image src={imageSrc} alt={title} width={30} height={30} />
        </div>
        <div>
          <p className="text-2xl font-bold text-[#929292]">{number}</p>
        </div>
      </div>
      <div className="w-[75%]">
        <p className="text-lg mb-1">{title}</p>
      </div>
      <p className="text-[#A7B1AC] font-light text-xs w-[85%] pt-2 justify-normal ">
        {description}
      </p>
    </div>
  );
}
