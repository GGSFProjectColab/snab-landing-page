"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "My favorite solution in the market. We work 5x faster with COMPANY.",
    by: "Alex, CEO at TechCorp",
    imgSrc: "https://i.pravatar.cc/150?img=1"
  },
  {
    tempId: 1,
    testimonial: "I'm confident my data is safe with COMPANY. I can't say that about other providers.",
    by: "Dan, CTO at SecureNet",
    imgSrc: "https://i.pravatar.cc/150?img=2"
  },
  {
    tempId: 2,
    testimonial: "I know it's cliche, but we were lost before we found COMPANY. Can't thank you guys enough!",
    by: "Stephanie, COO at InnovateCo",
    imgSrc: "https://i.pravatar.cc/150?img=3"
  },
  {
    tempId: 3,
    testimonial: "COMPANY's products make planning for the future seamless. Can't recommend them enough!",
    by: "Marie, CFO at FuturePlanning",
    imgSrc: "https://i.pravatar.cc/150?img=4"
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars, I'd give 12.",
    by: "Andre, Head of Design at CreativeSolutions",
    imgSrc: "https://i.pravatar.cc/150?img=5"
  },
  {
    tempId: 5,
    testimonial: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.",
    by: "Jeremy, Product Manager at TimeWise",
    imgSrc: "https://i.pravatar.cc/150?img=6"
  },
  {
    tempId: 6,
    testimonial: "Took some convincing, but now that we're on COMPANY, we're never going back.",
    by: "Pam, Marketing Director at BrandBuilders",
    imgSrc: "https://i.pravatar.cc/150?img=7"
  },
  {
    tempId: 7,
    testimonial: "I would be lost without COMPANY's in-depth analytics. The ROI is EASILY 100X for us.",
    by: "Daniel, Data Scientist at AnalyticsPro",
    imgSrc: "https://i.pravatar.cc/150?img=8"
  },
  {
    tempId: 8,
    testimonial: "It's just the best. Period.",
    by: "Fernando, UX Designer at UserFirst",
    imgSrc: "https://i.pravatar.cc/150?img=9"
  },
  {
    tempId: 9,
    testimonial: "I switched 5 years ago and never looked back.",
    by: "Andy, DevOps Engineer at CloudMasters",
    imgSrc: "https://i.pravatar.cc/150?img=10"
  },
  {
    tempId: 10,
    testimonial: "I've been searching for a solution like COMPANY for YEARS. So glad I finally found one!",
    by: "Pete, Sales Director at RevenueRockets",
    imgSrc: "https://i.pravatar.cc/150?img=11"
  },
  {
    tempId: 11,
    testimonial: "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
    by: "Marina, HR Manager at TalentForge",
    imgSrc: "https://i.pravatar.cc/150?img=12"
  },
  {
    tempId: 12,
    testimonial: "COMPANY's customer support is unparalleled. They're always there when we need them.",
    by: "Olivia, Customer Success Manager at ClientCare",
    imgSrc: "https://i.pravatar.cc/150?img=13"
  },
  {
    tempId: 13,
    testimonial: "The efficiency gains we've seen since implementing COMPANY are off the charts!",
    by: "Raj, Operations Manager at StreamlineSolutions",
    imgSrc: "https://i.pravatar.cc/150?img=14"
  },
  {
    tempId: 14,
    testimonial: "COMPANY has revolutionized how we handle our workflow. It's a game-changer!",
    by: "Lila, Workflow Specialist at ProcessPro",
    imgSrc: "https://i.pravatar.cc/150?img=15"
  },
  {
    tempId: 15,
    testimonial: "The scalability of COMPANY's solution is impressive. It grows with our business seamlessly.",
    by: "Trevor, Scaling Officer at GrowthGurus",
    imgSrc: "https://i.pravatar.cc/150?img=16"
  },
  {
    tempId: 16,
    testimonial: "I appreciate how COMPANY continually innovates. They're always one step ahead.",
    by: "Naomi, Innovation Lead at FutureTech",
    imgSrc: "https://i.pravatar.cc/150?img=17"
  },
  {
    tempId: 17,
    testimonial: "The ROI we've seen with COMPANY is incredible. It's paid for itself many times over.",
    by: "Victor, Finance Analyst at ProfitPeak",
    imgSrc: "https://i.pravatar.cc/150?img=18"
  },
  {
    tempId: 18,
    testimonial: "COMPANY's platform is so robust, yet easy to use. It's the perfect balance.",
    by: "Yuki, Tech Lead at BalancedTech",
    imgSrc: "https://i.pravatar.cc/150?img=19"
  },
  {
    tempId: 19,
    testimonial: "We've tried many solutions, but COMPANY stands out in terms of reliability and performance.",
    by: "Zoe, Performance Manager at ReliableSystems",
    imgSrc: "https://i.pravatar.cc/150?img=20"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-5 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-primary text-primary-foreground border-primary" 
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize * 0.85,
        clipPath: `polygon(30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% 100%, calc(100% - 30px) 100%, 30px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.6) * position}px)
          translateY(${isCenter ? -40 : position % 2 ? 10 : -10}px)
          rotate(${isCenter ? 0 : position % 2 ? 2 : -2}deg)
        `,
        boxShadow: isCenter ? "0px 6px 0px 3px var(--border)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 28,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-3 h-10 w-9 bg-muted object-cover object-top"
        style={{
          boxShadow: "2px 2px 0px var(--background)"
        }}
      />
      <h3 className={cn(
        "text-body font-medium",
        isCenter ? "text-primary-foreground" : "text-foreground"
      )}>
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p className={cn(
        "absolute bottom-5 left-5 right-5 mt-2 text-caption italic",
        isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(280);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const testimonialsRef = React.useRef(testimonialsList);

  // Keep the ref in sync so the interval callback always has the latest list
  useEffect(() => {
    testimonialsRef.current = testimonialsList;
  }, [testimonialsList]);

  const handleMove = React.useCallback((steps: number) => {
    const newList = [...testimonialsRef.current];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  }, []);

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const interval = setInterval(() => {
      handleMove(1);
    }, 3000);
    return () => clearInterval(interval);
  }, [handleMove, reduceMotion]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 280 : 240);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-muted/30"
      style={{ height: 420 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-10 w-10 items-center justify-center transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-10 w-10 items-center justify-center transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
