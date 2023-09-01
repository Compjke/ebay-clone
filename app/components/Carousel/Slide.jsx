import Image from 'next/image';


const Slide = ({src}) => {
   return (
     <div className="h-[400px] max-sm:h-[30vh] relative">
       <Image
         src={src}
         alt="banner-image"
         fill
         className="object-cover"
       />
     </div>
   );
}
 
export default Slide;