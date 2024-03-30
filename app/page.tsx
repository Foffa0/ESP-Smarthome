import Image from "next/image";
import Card from "@components/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between py-24 px-80">
      <section>
        <h2 className=" font-semibold text-3xl">Devices</h2>
        <p className="text-slate-500">Below are all smarthome devices found in your local network</p>
        <div className="w-50 h-60 py-10 flex flex-row flex-wrap gap-4">
          <Card name="Led Strip Bett" type={1} />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </main>
  );
}
