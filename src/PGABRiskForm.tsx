import { useState } from "react";

export default function PGABRiskForm() {
  const [form, setForm] = useState({
    age: 0,
    sex: "female",
    bmi: 25,
    asa: 1,
    respiratoryDisease: false,
    smokingPackYears: 0,
    spo2: 98,
    sirs: false,
    abnormalCxr: false,
    surgeryUrgency: "elective",
    surgeryType: "lower_abdomen",
  });

  const [score, setScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState("");
  const [isHighRisk, setIsHighRisk] = useState(false);

  const calculateScore = () => {
    let total = 0;
    if (form.age > 60) total += 3;
    total += form.sex === "male" ? 2 : 1;

    if (form.bmi < 30) total += 1;
    else if (form.bmi <= 35) total += 2;
    else total += 3;

    if (form.asa === 1) total += 1;
    else if (form.asa === 2) total += 2;
    else total += 3;

    if (form.respiratoryDisease) total += 3;
    if (form.smokingPackYears > 10) total += 3;
    if (form.spo2 < 95) total += 3;
    if (form.sirs) total += 2;
    if (form.abnormalCxr) total += 3;

    total += form.surgeryUrgency === "emergency" ? 2 : 1;

    switch (form.surgeryType) {
      case "upper_abdomen":
        total += 3;
        break;
      case "lower_abdomen":
      case "neck":
      case "face":
      case "extremities":
        total += 1;
        break;
    }

    setScore(total);
    const highRisk = total >= 13;
    setRiskLevel(highRisk ? "กลุ่มเสี่ยงสูง" : "กลุ่มเสี่ยงต่ำ");
    setIsHighRisk(highRisk);
  };

  const riskClass =
    riskLevel === "กลุ่มเสี่ยงสูง"
      ? "bg-red-500 text-white px-4 py-2 rounded"
      : riskLevel === "กลุ่มเสี่ยงต่ำ"
      ? "bg-green-500 text-white px-4 py-2 rounded"
      : "";

  return (
    <div className="text-gray-900 max-w-xl mx-auto mt-4 p-4 bg-gradient-to-br from-white via-green-50 to-white shadow-lg border border-green-300 rounded-xl">
      <div className="p-6 pt-0 space-y-4">
        <h2 className="text-2xl font-bold text-[#0056A4] bg-blue-100 px-5 py-3 rounded shadow text-center">
          แบบประเมินความเสี่ยง P-GAB Risk Score
        </h2>

        {/* Input fields */}
        <div>
          <label className="text-sm font-medium">อายุ (ปี)</label>
          <input
            type="number"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">เพศ</label>
          <div className="relative">
            <select
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              value={form.sex}
              onChange={(e) => setForm({ ...form, sex: e.target.value })}
            >
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">BMI (kg/m²)</label>
          <input
            type="number"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            value={form.bmi}
            onChange={(e) => setForm({ ...form, bmi: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">ASA Class</label>
          <div className="relative">
            <select
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              value={String(form.asa)}
              onChange={(e) =>
                setForm({ ...form, asa: Number(e.target.value) })
              }
            >
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3-4</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            checked={form.respiratoryDisease}
            onChange={(e) =>
              setForm({ ...form, respiratoryDisease: e.target.checked })
            }
          />
          <label className="text-sm font-medium">
            มีโรคทางเดินหายใจ (COPD, Asthma)
          </label>
        </div>
        <div>
          <label className="text-sm font-medium">Smoking (pack-year)</label>
          <input
            type="number"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            value={form.smokingPackYears}
            onChange={(e) =>
              setForm({ ...form, smokingPackYears: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label className="text-sm font-medium">ระดับ SpO₂ room air (%)</label>
          <input
            type="number"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            value={form.spo2}
            onChange={(e) => setForm({ ...form, spo2: Number(e.target.value) })}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            checked={form.sirs}
            onChange={(e) => setForm({ ...form, sirs: e.target.checked })}
          />
          <label className="text-sm font-medium">มีภาวะ SIRS หรือ Sepsis</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            checked={form.abnormalCxr}
            onChange={(e) =>
              setForm({ ...form, abnormalCxr: e.target.checked })
            }
          />
          <label className="text-sm font-medium">ภาพรังสีทรวงอกผิดปกติ</label>
        </div>
        <div>
          <label className="text-sm font-medium">ประเภทผู้ป่วยผ่าตัด</label>
          <div className="relative">
            <select
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              value={form.surgeryUrgency}
              onChange={(e) =>
                setForm({ ...form, surgeryUrgency: e.target.value })
              }
            >
              <option value="elective">Elective</option>
              <option value="emergency">Emergency</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">ตำแหน่งผ่าตัด</label>
          <div className="relative">
            <select
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              value={form.surgeryType}
              onChange={(e) =>
                setForm({ ...form, surgeryType: e.target.value })
              }
            >
              <option value="upper_abdomen">Upper abdomen</option>
              <option value="lower_abdomen">Lower abdomen</option>
              <option value="neck">Neck</option>
              <option value="face">Facial</option>
              <option value="extremities">Upper/Lower extremities</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
        </div>

        <button
          onClick={calculateScore}
          className="inline-flex items-center justify-center h-9 px-4 py-2 bg-[#0056A4] hover:bg-[#003C7E] text-white font-semibold rounded shadow w-full"
        >
          คำนวณคะแนน
        </button>

        <div className="text-lg font-semibold mt-4">
          คะแนนความเสี่ยง: {score} คะแนน
        </div>
        {riskLevel && (
          <div className={`text-base mt-1 ${riskClass}`}>
            ระดับความเสี่ยง: {riskLevel}
          </div>
        )}

        {isHighRisk && (
          <div className="mt-4 space-y-2">
            <details className="bg-orange-100 rounded-md">
              <summary className="p-2 cursor-pointer font-semibold">
                🟧 แนวทางสำหรับผู้ป่วย Asthma
              </summary>
              <div className="p-4">
                • Elective case: Admit order: Bronchodilator ตามแผนการรักษา
                <br />
                • Emergency case: Bronchodilator MDI 2 puffs ก่อนเข้าห้องผ่าตัด
                <br />
                • หากเกิด bronchospasm:
                <br />
                   o ให้ FiO₂ 100%, เพิ่มระดับ anesthesia, manual bag
                ventilation
                <br />
                   o Salbutamol MDI 8–10 puffs + Dexamethasone
                <br />
                   o หากไม่ดีขึ้น → เพิ่ม Ipratropium MDI
                <br />
                   o ไม่ดีขึ้นอีก → Salbutamol NB 2.5 mg repeat
              </div>
            </details>
            <details className="bg-blue-100 rounded-md">
              <summary className="p-2 cursor-pointer font-semibold">
                🟦 แนวทางสำหรับผู้ป่วย COPD
              </summary>
              <div className="p-4">
                • Elective case: Admit order: Bronchodilator ตามแผนการรักษา
                <br />
                • Emergency case: Bronchodilator MDI 2 puffs ก่อนเข้าห้องผ่าตัด
                <br />
                • หากเกิด bronchospasm:
                <br />
                   o FiO₂ 100%, เพิ่ม anesthesia, manual bag ventilation
                <br />
                   o Ipratropium MDI 8–10 puffs + Dexamethasone
                <br />
                   o หากไม่ดีขึ้น → Ipratropium NB 0.5 mg repeat
              </div>
            </details>
            <details className="bg-yellow-100 rounded-md">
              <summary className="p-2 cursor-pointer font-semibold">
                🟨 แนวทางสำหรับผู้ป่วยแพ้/สูบบุหรี่
              </summary>
              <div className="p-4">
                • ประเมินในกลุ่มความเสี่ยงสูง
                <br />
                • พิจารณาเตรียม bronchodilator ไว้ standby
                <br />
                • ติดตามอาการหลังให้ยาภายใน 30 นาที
                <br />• ดำเนินการต่อเมื่ออาการดีขึ้น
              </div>
            </details>
            <details className="bg-purple-100 rounded-md">
              <summary className="p-2 cursor-pointer font-semibold">
                📌 หมายเหตุ
              </summary>
              <div className="p-4">
                • ใช้ Aldrete Score เพื่อประเมินก่อนส่งผู้ป่วยออกจากห้องพักฟื้น
                <br />
                o Aldrete ≥ 9 → Discharge
                <br />o Aldrete &lt; 9 → ประเมินซ้ำ หรือ consult specialist
              </div>
            </details>
          </div>
        )}

        {!isHighRisk && riskLevel && (
          <div className="text-sm mt-4 bg-green-100 text-green-900 p-4 rounded border border-green-300 shadow flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-green-700 text-lg">✅</span>
              <span className="font-semibold">
                ข้อเสนอแนะแนวทางสำหรับกลุ่มเสี่ยงต่ำ
              </span>
            </div>
            ✅ ข้อเสนอแนะแนวทาง:
            ผู้ป่วยสามารถเข้ารับการระงับความรู้สึกและผ่าตัดตามมาตรฐานได้
            ให้ฟังลักษณะเสียงปอดที่ผิดปกติก่อนเริ่มการระงับความรู้สึก
            นับอัตราการหายใจเต็ม 1 นาทีก่อนเริ่มการระงับความรู้สึก ให้ติดตาม
            SpO₂ และสัญญาณชีพตามปกติ ไม่จำเป็นต้องให้ Bronchodilator routine
          </div>
        )}
      </div>
    </div>
  );
}
