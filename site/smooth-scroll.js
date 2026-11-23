/**
 * Slow scroll leve e responsivo.
 * Aplica interpolação suave (lerp) apenas em dispositivos com ponteiro fino (desktop)
 * e respeita `prefers-reduced-motion: reduce`.
 */
class SmoothScrollController {
  constructor() {
    this.targetY = window.scrollY;
    this.currentY = window.scrollY;
    this.rafId = null;
    this.ease = 0.085; // Inércia leve e agradável
    this.wheelMultiplier = 0.85; // Levemente mais cadenciado (slow scroll leve)
    this.enabled = false;

    this.onWheel = this.onWheel.bind(this);
    this.onNativeScroll = this.onNativeScroll.bind(this);
    this.tick = this.tick.bind(this);

    this.init();
  }

  shouldEnable() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    return !reducedMotion && finePointer;
  }

  init() {
    this.enabled = this.shouldEnable();
    if (!this.enabled) return;

    window.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('scroll', this.onNativeScroll, { passive: true });
  }

  getMaxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  onWheel(event) {
    // Não interceptar zoom (ctrlKey) nem elementos internos com scroll próprio
    if (event.ctrlKey) return;
    const scrollableAncestor = event.target.closest?.('[data-native-scroll]');
    if (scrollableAncestor) return;

    event.preventDefault();

    if (!this.rafId) {
      this.currentY = window.scrollY;
      this.targetY = window.scrollY;
    }

    const delta = event.deltaY * this.wheelMultiplier;
    this.targetY = Math.min(Math.max(0, this.targetY + delta), this.getMaxScroll());

    if (!this.rafId) {
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  onNativeScroll() {
    if (!this.rafId) {
      this.currentY = window.scrollY;
      this.targetY = window.scrollY;
    }
  }

  tick() {
    const diff = this.targetY - this.currentY;
    if (Math.abs(diff) < 0.4) {
      this.currentY = this.targetY;
      window.scrollTo(0, this.currentY);
      this.rafId = null;
      return;
    }

    this.currentY += diff * this.ease;
    window.scrollTo(0, this.currentY);
    this.rafId = requestAnimationFrame(this.tick);
  }

  scrollToTop(instant = false) {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (instant || !this.enabled) {
      window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' });
      this.currentY = 0;
      this.targetY = 0;
      return;
    }

    this.currentY = window.scrollY;
    this.targetY = 0;
    this.rafId = requestAnimationFrame(this.tick);
  }
}

export const smoothScroll = new SmoothScrollController();
