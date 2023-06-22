import Image from "next/image";

const AdBanner: React.FC = () => {
  return (
    <div className="row-span-1 w-full bg-red-500 rounded-lg relative">
      <Image
        alt="promo cremer lovers"
        src="/cremer_lover.png"
        fill
        className="object-cover rounded-lg"
      />
    </div>
  );
};

export default AdBanner;
