import Devices from "@components/Devices";
import Scenes from "@components/Scenes"
import { checkDevices } from "@db/data";

export default function Home() {
  checkDevices();
  return (
    <div className="py-24 px-10 max-w-3xl">
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
