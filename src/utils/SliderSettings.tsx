import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styles from "./styles.module.css";

export const TdefaultSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <TGPNextArrow />,
        prevArrow: <TGPPrevArrow />,
      },
    },
  ],
};

function TGPNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`font-[800] tracking-wider cursor-pointer `}
      style={{
        // ...style,

        zIndex: 9,
        position: "absolute",
        right: "-1%",
        top: "45%",
        transform: "translateY(-50%)",
        lineHeight: "1",
        height: "50px",
        opacity: 1,
        color: "#4140402a",
      }}
      // scale={5}
      onClick={onClick}
    >
      <div className=" flex justify-center items-center h-10 mb- w-6 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white ">
        <AiOutlineRight className="h-3 w-3 rounded-full " />
      </div>
    </div>
  );
}

function TGPPrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`font-[800] tracking-wider cursor-pointer `}
      style={{
        zIndex: 9,
        position: "absolute",
        left: "-1%",
        top: "45%",
        transform: "translateY(-50%)",
        lineHeight: "1",
        height: "50px",
        opacity: 1,
        color: "#e0dada2a",
      }}
      // scale={5}
      onClick={onClick}
    >
      <div className="flex justify-center items-center h-10 w-6 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white">
        <AiOutlineLeft className="h-3 w-3 rounded-full  " />
      </div>
    </div>
  );
}

export const defaultSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <HottestPropertiesNextArrow />,
  prevArrow: <HottestPropertiesPrevArrow />,
  // customPaging: (i: any) => (
  //   <div
  //     style={{
  //       width: "30px",
  //       color: "white",
  //     }}
  //   >
  //     .
  //   </div>
  // ),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <MHottestPropertiesNextArrow />,
        prevArrow: <MHottestPropertiesPrevArrow />,
      },
    },
  ],
};

function HottestPropertiesNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`font-[800] tracking-wider cursor-pointer ${styles.arrowButtonNext}`}
      style={{
        // ...style,

        zIndex: 9,
        position: "absolute",
        right: "-1%",
        top: "50%",
        transform: "translateY(-50%)",
        lineHeight: "1",
        height: "50px",
        opacity: 1,
        color: "#4140402a",
      }}
      // scale={5}
      onClick={onClick}
    >
      <div className=" flex justify-center items-center h-16 w-10 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white ">
        <AiOutlineRight className="h-6 w-6 rounded-full " />
      </div>
    </div>
  );
}

function HottestPropertiesPrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`font-[800] tracking-wider cursor-pointer `}
      style={{
        zIndex: 9,
        position: "absolute",
        left: "-1%",
        top: "50%",
        transform: "translateY(-50%)",
        lineHeight: "1",
        height: "50px",
        opacity: 1,
        color: "#e0dada2a",
      }}
      // scale={5}
      onClick={onClick}
    >
      <div className="flex justify-center items-center h-16 w-10 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white">
        <AiOutlineLeft className="h-6 w-6 rounded-full  " />
      </div>
    </div>
  );
}

function MHottestPropertiesNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`font-[800] tracking-wider cursor-pointer `}
      style={{
        // ...style,

        zIndex: 9,
        position: "absolute",
        right: "1%",
        top: "-10%",
        transform: "translateY(-50%)",
        lineHeight: "1",
        height: "50px",
        opacity: 1,
        color: "#4140402a",
      }}
      // scale={5}
      onClick={onClick}
    >
      <div className=" flex justify-center items-center h-12 w-10 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white ">
        <AiOutlineRight className="h-6 w-6 rounded-full " />
      </div>
    </div>
  );
}

function MHottestPropertiesPrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`font-[800] tracking-wider cursor-pointer `}
      style={{
        zIndex: 9,
        position: "absolute",
        right: "14%",
        top: "-10%",
        transform: "translateY(-50%)",
        lineHeight: "1",
        height: "50px",
        opacity: 1,
        color: "#e0dada2a",
      }}
      // scale={5}
      onClick={onClick}
    >
      <div className="flex justify-center items-center h-12 w-10 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white ">
        <AiOutlineLeft className="h-6 w-6 rounded-full  " />
      </div>
    </div>
  );
}
// ----------------------------------------------------------------------------------------------

export const partnerSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <MPartnerNextArrow />,
  prevArrow: <MPartnerPrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <MPartnerNextArrow />,
        prevArrow: <MPartnerPrevArrow />,
      },
    },
  ],
};

export const TopleaderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <MPartnerNextArrow />,
  prevArrow: <MPartnerPrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <MPartnerNextArrow />,
        prevArrow: <MPartnerPrevArrow />,
      },
    },
  ],
};

function PartnerNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`font-[800] tracking-wider cursor-pointer ${styles.arrowButtonNext}`}
      style={{ 
        zIndex: 9,
        position: "absolute",
        right: "15%",
        top: "-5.5%",
        transform: "translateY(-50%)",
        lineHeight: "1",
        height: "50px",
        opacity: 1,
        color: "#4140402a",
      }}
      // scale={5}
      onClick={onClick}
    >
      <div className=" flex justify-center items-center h-10 w-10 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white rounded-2xl">
        <AiOutlineRight className="h-6 w-6 rounded-full " />
      </div>
    </div>
  );
}

function PartnerPrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`font-[800] tracking-wider cursor-pointer ${styles.arrowButtonPrev}`}
      style={{
        zIndex: 9,
        position: "absolute",
        right: "20%",
        top: "-5.5%",
        transform: "translateY(-50%)",
        lineHeight: "1",
        height: "50px",
        opacity: 1,
        color: "#e0dada2a",
      }}
      // scale={5}
      onClick={onClick}
    >
      <div className="flex justify-center items-center h-10 w-10 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white rounded-2xl">
        <AiOutlineLeft className="h-6 w-6 rounded-full  " />
      </div>
    </div>
  );
}

function MPartnerNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`font-[800] tracking-wider  `}
      style={{
        // ...style,

        zIndex: 9,
        position: "absolute",
        right: "0%",
        top: "35%",
        transform: "translateY(-50%)",
        lineHeight: "1",
        height: "50px",
        opacity: 1,
        color: "#4140402a",
      }}
      onClick={onClick}
    >
      <div className=" flex justify-center items-center h-12  w-10 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white ">
        <AiOutlineRight className="h-6 w-6 rounded-full " />
      </div>
    </div>
  );
}

function MPartnerPrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`font-[800] tracking-wider  `}
      style={{
        zIndex: 9,
        position: "absolute", 
        top: "35%",
        transform: "translateY(-50%)",
        lineHeight: "1",
        height: "50px",
        opacity: 1,
        color: "#e0dada2a",
      }}
      // scale={5}
      onClick={onClick}
    >
      <div className="flex justify-center items-center h-12 w-10 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white ">
        <AiOutlineLeft className="h-6 w-6 rounded-full  " />
      </div>
    </div>
  );
}
// ---------------------------------------------------------------

export const FeaturedQuestSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  appendDots: (dots: any) => (
    <div
      style={{
        position: "absolute",
        right: "-3%",
        top: "-7%",
        width: "200px",
        height: "20px",
      }}
    >
      <ul style={{ margin: "0px" }}> {dots} </ul>
    </div>
  ),
  customPaging: (i: any) => (
    <div
      style={{
        color: "white",
      }}
    >
      .
    </div>
  ),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots: any) => (
          <div
            style={{
              position: "absolute",
              right: "-10px",
              top: "-4%",
              width: "180px",
              height: "20px",
            }}
          >
            <ul style={{ margin: "0px" }}> {dots} </ul>
          </div>
        ),
        customPaging: (i: any) => (
          <div
            style={{
              color: "white",
            }}
          >
            .
          </div>
        ),
      },
    },
  ],
};

// ---------------------------------------------------------------

export const MobileLeaderboardSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  appendDots: (dots: any) => (
    <div
      style={{
        position: "absolute",
        right: "-3%",
        top: "-7%",
        width: "200px",
        height: "20px",
      }}
    >
      <ul style={{ margin: "0px" }}> {dots} </ul>
    </div>
  ),
  customPaging: (i: any) => (
    <div
      style={{
        color: "white",
      }}
    >
      .
    </div>
  ),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots: any) => (
          <div
            style={{
              position: "absolute",
              right: "-20px",
              top: "-4%",
              width: "150px",
              height: "20px",
            }}
          >
            <ul style={{ margin: "0px" }}> {dots} </ul>
          </div>
        ),
        customPaging: (i: any) => (
          <div
            style={{
              color: "white",
            }}
          >
            .
          </div>
        ),
      },
    },
  ],
};

export const tgfeatureSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  appendDots: (dots: any) => (
    <div
      style={{
        position: "relative",
        bottom: "-10px",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <ul style={{ margin: "0px", padding: "0", listStyleType: "none" }}>
        {dots}
      </ul>
    </div>
  ),
  customPaging: (i: any) => (
    <div
      style={{
        color: "white",
        fontSize: "5px", // Adjust dot size as needed
        cursor: "pointer",
      }}
    >
      ● {/* Using a bullet for dots */}
    </div>
  ),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots: any) => (
          <div
            style={{
              position: "relative",
              bottom: "-10px",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <ul style={{ margin: "0px", padding: "0", listStyleType: "none" }}>
              {dots}
            </ul>
          </div>
        ),
        customPaging: (i: any) => (
          <div
            style={{
              color: "white",
              fontSize: "5px", // Adjust dot size as needed
              cursor: "pointer",
            }}
          >
            ●
          </div>
        ),
      },
    },
  ],
};
