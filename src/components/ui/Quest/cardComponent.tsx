"use client";
import { Progress } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IcarComponent {
  index: number;
  item: any;
  type: string;
  partner?: boolean;
}

export default function CardComponent({
  index,
  item,
  type,
  partner = false,
}: IcarComponent): any {
  const router = useRouter();

  return (
    <div
      key={index}
      className="border border-[#414040] rounded-xl flex justify-center p-2 md:p-2 xl:p-3 relative group"
    >
      <div className="w-full h-full flex flex-col justify-between">
        {/* Image Section */}
        <div className="relative w-full h-[70%] overflow-hidden rounded">
          <div
            style={{
             background: `${item?.color}`, 
           }} 
           >
            <div
            className={`bg-grid-trending  w-full h-full flex justify-center items-center relative`}
            >
              <Link
                href={`/quest/${item?.slug}?type=${type}`}
                className="flex justify-center p-4 w-full md:h-[25vh] h-[45vh] py-5"
              >
                <Image
                  src={
                    item?.image
                      ? item?.image
                      : require("../../../../public/backgroud/m-monkey.png")
                  }
                  alt="honor.png"
                  width={500}
                  height={400}
                  className="p-3 object-contain"
                />

                {/* Overlay on Image */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                {/* Button on Image */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-white bg-[#080612] bg-opacity-20 backdrop-blur-sm   px-4 py-2 rounded-lg"
                  onClick={() =>
                    router.push(`/quest/${item?.slug}?type=${type}`)
                  }
                >
                  <button className="bg-green px-3 py-2 rounded-xl text-black">
                    Start Quest
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="h-[40%]">
          <p className="text-xs my-2 line-clamp-1 overflow-hidden">
            {item?.title}
          </p>
          <div className="text-[11px] text-textGrey mb-3 h-8">
            {item?.type == "Campaign" || item?.partner?.name ? (
              item?.partner?.name ? (
                item?.partner?.name
              ) : (
                item?.partner
              )
            ) : (
              <Progress
                aria-label="Downloading..."
                size="sm"
                value={item?.completion_percentage}
                color="success"
                showValueLabel={true}
                className="max-w-md"
              />
            )}
          </div>

          <div className="flex items-center sm:justify-start justify-center w-full gap-3 md:gap-1">
            <div className="flex items-center justify-center w-full text-[10px] md:text-[8px] lg:text-[9px] xl:text-[11px] px-1 py-2 border border-[#414040] rounded-3xl">
              <span className="flex items-center gap-1">
                <Image
                  src={require("../../../../public/backgroud/quest-task.png")}
                  alt="quest-task.png"
                  className="w-3 h-3"
                />
                &nbsp;{item?.tasks} Tasks
              </span>
            </div>

            <div className="flex items-center justify-center w-full text-[10px] md:text-[8px] lg:text-[9px] xl:text-[11px] px-1 py-2 border border-[#414040] rounded-3xl">
              <span className="flex items-center gap-1">
                <Image
                  src={require("../../../../public/backgroud/honor.png")}
                  alt="honor.png"
                  className="md:w-3 lg:h-4 md:h-3 lg:w-4"
                />
                &nbsp;{item?.honors} Honors
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
