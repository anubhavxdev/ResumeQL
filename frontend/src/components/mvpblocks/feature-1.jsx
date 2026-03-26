import {
  Lock,
  Shield,
  Key,
  RefreshCw,
  FileText,
  Eye,
} from "lucide-react";
const features = [
  {
    icon: <Lock className="h-6 w-6" />,
    title: "AI Analysis",
    desc: "Advanced AI filters and analyzes your resume against any job description for maximum relevance.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "ATS Scoring",
    desc: "Get a real-time ATS compatibility score to ensure your resume survives automated filters.",
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Keyword Insight",
    desc: "Identify missing keywords and skills instantly to bridge the gap between you and the role.",
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Dynamic Optimization",
    desc: "Auto-generate professional LaTeX summaries and bullet points tailored to the employer's needs.",
  },
  {
    icon: <Key className="h-6 w-6" />,
    title: "Premium Templates",
    desc: "Access highly-optimized LaTeX templates proven to perform better in top-tier tech companies.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "PDF Export",
    desc: "Seamlessly compile and download your optimized resume in high-quality PDF format.",
  },
];
export default function Feature1() {
  return (
    <div className="relative w-full bg-neutral-950">
      <div className="absolute top-0 z-[0] h-full w-full bg-neutral-900/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <section className="relative z-1 mx-auto max-w-full py-14">
        <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px] top-0 left-0">
          <div className="absolute inset-0 [transform:rotateX(35deg)]">
            <div className="animate-grid [inset:0%_0px] [margin-left:-50%] [height:300vh] [width:600vw] [transform-origin:100%_0_0] [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)] [background-size:120px_120px] [background-repeat:repeat]"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%"></div>
        </div>

        <div className="z-10 relative mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="relative mx-auto max-w-2xl sm:text-center">
            <div className="relative z-10">
              <h3 className="font-geist mt-4 text-3xl font-normal tracking-tighter text-white sm:text-4xl md:text-5xl">
                Everything you need to land the job
              </h3>
              <p className="font-geist text-gray-400 mt-3">
                Optimize your resume and beat the ATS with our AI-powered career co-pilot.
              </p>
            </div>
            {/* Removed the localized blur/gradient to avoid clashing with the new background */}
          </div>
          <hr className="bg-white/10 mx-auto mt-5 h-px w-1/2" />
          <div className="relative mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item, idx) => (
                <li
                  key={idx}
                  className="transform-gpu space-y-3 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm p-4 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
                  <div className="text-white w-fit transform-gpu rounded-full border border-white/10 p-4 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
                    {item.icon}
                  </div>
                  <h4 className="font-geist text-lg font-bold tracking-tighter text-white">
                    {item.title}
                  </h4>
                  <p className="text-gray-400">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}