import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Site-wide motion director.
 * Animates existing content without changing the information architecture
 * or interfering with commerce state.
 */
export default function MotionDirector() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    let mutationObserver;
    const context = gsap.context(() => {
      gsap.config({ nullTargetWarn: false });

      // The hero gets a deliberate opening sequence rather than a generic fade.
      const hero = document.querySelector('#hero-section');
      if (hero) {
        const heroCopy = hero.querySelectorAll('h1, h2, p, a, button');
        const heroMedia = hero.querySelectorAll('img');
        if (heroMedia[0]) heroMedia[0].setAttribute('data-fc-parallax', 'true');
        gsap.fromTo(heroCopy,
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.11, ease: 'power3.out', delay: 0.12, clearProps: 'all' }
        );
        gsap.fromTo(heroMedia,
          { autoAlpha: 0, scale: 1.08, y: 22, clipPath: 'inset(8% 8% 8% 8% round 28px)' },
          { autoAlpha: 1, scale: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.25, stagger: 0.12, ease: 'power3.out', delay: 0.22, clearProps: 'clipPath' }
        );
      }

      // Each content section reveals its own heading, copy and media on entry.
      gsap.utils.toArray('main section').forEach((section) => {
        if (section.id === 'hero-section') return;

        const headings = section.querySelectorAll('h2, h3, .fc-section-heading');
        const kickers = section.querySelectorAll('.text-xs.font-extrabold, .uppercase.tracking-\\[0\\.22em\\]');
        const paragraphs = section.querySelectorAll('p');
        const images = section.querySelectorAll('img');
        const cards = section.querySelectorAll('.fc-product-card, article, [data-motion-card]');

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true
          }
        });

        if (kickers.length) {
          timeline.fromTo(kickers,
            { autoAlpha: 0, x: -18 },
            { autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.06, ease: 'power2.out' },
            0
          );
        }
        if (headings.length) {
          timeline.fromTo(headings,
            { autoAlpha: 0, y: 30, clipPath: 'inset(0 0 35% 0)' },
            { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.78, stagger: 0.1, ease: 'power3.out' },
            0.04
          );
        }
        if (paragraphs.length) {
          timeline.fromTo(paragraphs,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.055, ease: 'power2.out' },
            0.18
          );
        }
        if (images.length) {
          timeline.fromTo(images,
            { autoAlpha: 0, scale: 1.045, y: 16 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.9, stagger: 0.075, ease: 'power3.out' },
            0.08
          );
        }
        if (cards.length) {
          timeline.fromTo(cards,
            { autoAlpha: 0, y: 28, scale: 0.985 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.075, ease: 'power3.out' },
            0.1
          );
        }
      });

      // Subtle depth movement on wide-screen editorial imagery only.
      if (window.matchMedia('(min-width: 1024px)').matches) {
        gsap.utils.toArray('[data-fc-parallax]').forEach((element) => {
          gsap.to(element, {
            yPercent: -7,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7
            }
          });
        });
      }

      // Dynamic commerce surfaces get a short entrance when they are inserted.
      const animateDynamicSurface = (element) => {
        if (!(element instanceof HTMLElement) || element.dataset.fcMotionReady) return;
        element.dataset.fcMotionReady = 'true';
        gsap.fromTo(element,
          { autoAlpha: 0, y: 18, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.34, ease: 'power2.out', clearProps: 'all' }
        );
      };
      mutationObserver = new MutationObserver((records) => {
        records.forEach((record) => record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches('[role="dialog"], [role="status"], .fc-toast')) animateDynamicSurface(node);
          node.querySelectorAll?.('[role="dialog"], [role="status"], .fc-toast').forEach(animateDynamicSurface);
        }));
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });

    });

    return () => {
      mutationObserver?.disconnect();
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
