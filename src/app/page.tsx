import Devices from "@components/Devices";
import Scenes from "@components/Scenes"

export default function Home() {
  return (
    <div className="lg:py-24 py-10 px-10 max-w-3xl">
      <div className="main"></div>
        <section>
          <Devices />
        </section>
        <section>
          <Scenes />
        </section>
      </div>
  );
}
