import Image from "next/image";
import Card from "@components/card";
import Link from "next/link";
import Devices from "@components/Devices";
import Scenes from "@components/Scenes"

export default function Home() {
  return (
    <div className="main py-24 px-10 lg:px-80 md:px-40 sm:px-12">
        <section>
          <Devices />
        </section>
        <section>
          <Scenes />
        </section>
      </div>
  );
}
