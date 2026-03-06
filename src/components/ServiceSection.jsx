import "../styles/serviceSection.css";
import {
  FiCamera,
  FiScissors,
  FiEdit3,
  FiLayout,
  FiSmile,
  FiShare2,
} from "react-icons/fi";

const services = [
  {
    title: "Content Production",
    icon: FiCamera,
    desc: "Our team will shoot high quality videos for your content.",
    tag: "Video",
  },
  {
    title: "Video Editing",
    icon: FiScissors,
    desc: "We will create captivating videos using fast paced video editing.",
    tag: "Editing",
  },
  {
    title: "Research & Writing",
    icon: FiEdit3,
    desc: "For each content, we will do the research and write compelling copies for you.",
    tag: "Copy",
  },
  {
    title: "Graphics Designing",
    icon: FiLayout,
    desc: "Our visual design experts will create aesthetic designs that stand out.",
    tag: "Design",
  },
  {
    title: "Meme Marketing",
    icon: FiSmile,
    desc: "Ideate and create relatable memes that resonated with the audience.",
    tag: "Viral",
  },
  {
    title: "Social Media Management",
    icon: FiShare2,
    desc: "End-to-end social media management to optimise content and drive engagement.",
    tag: "Growth",
  },
];

export default function ServiceSection() {
  return (
    <section className="service-section">

      <p className="service-label">WHAT WE OFFER</p>
      <h2 className="service-title">
        Here&apos;s what we will do for you
      </h2>

      <div className="service-grid">
        {services.map((item, i) => {
          const Icon = item.icon;
          return (
            <div className="svc-card" key={i}>

              {/* Icon badge */}
              <div className="svc-icon-wrap">
                <Icon className="svc-icon" />
              </div>

              {/* Tag pill */}
              <span className="svc-tag">{item.tag}</span>

              <h3 className="svc-name">{item.title}</h3>
              <p className="svc-desc">{item.desc}</p>

              {/* Bottom accent line */}
              <div className="svc-line" />

            </div>
          );
        })}
      </div>

    </section>
  );
}
