import Image from "next/image";
import Card from "@components/card";
import Link from "next/link";
import Devices from "@components/Devices";
import Scenes from "@components/Scenes"

export default function Home() {
  return (
    <div>
        <section>
          <Devices />
        </section>
        <section>
          <Scenes />
        </section>
      </div>
  );
}
