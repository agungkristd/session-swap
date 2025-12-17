export class InputField {
  private container: HTMLElement;
  private input: HTMLInputElement;
  private confirmBtn: HTMLButtonElement;
  private cancelBtn: HTMLButtonElement;
  private onConfirm: ((name: string) => Promise<void>) | null = null;
  private onCancel: (() => void) | null = null;

  constructor(
    containerId: string,
    inputId: string,
    confirmBtnId: string,
    cancelBtnId: string
  ) {
    this.container = document.getElementById(containerId) as HTMLElement;
    this.input = document.getElementById(inputId) as HTMLInputElement;
    this.confirmBtn = document.getElementById(
      confirmBtnId
    ) as HTMLButtonElement;
    this.cancelBtn = document.getElementById(cancelBtnId) as HTMLButtonElement;

    this.initListeners();
  }

  private initListeners() {
    if (this.confirmBtn) {
      this.confirmBtn.addEventListener("click", async () => {
        const name = this.input.value.trim();
        if (this.onConfirm) await this.onConfirm(name);
      });
    }

    if (this.cancelBtn) {
      this.cancelBtn.addEventListener("click", () => {
        this.reset();
        if (this.onCancel) this.onCancel();
      });
    }

    if (this.input) {
      this.input.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
          const name = this.input.value.trim();
          if (this.onConfirm) await this.onConfirm(name);
        }
      });
    }
  }

  public show(
    initialValue: string = "",
    placeholder: string = "Session Name (e.g. Personal)",
    confirmLabel: string = "Save Session"
  ) {
    this.input.value = initialValue;
    this.input.placeholder = placeholder;
    this.confirmBtn.textContent = confirmLabel;
    this.container.classList.remove("hidden");
    this.input.focus();
  }

  public reset() {
    this.container.classList.add("hidden");
    this.input.value = "";
    this.input.placeholder = "Session Name (e.g. Personal)";
    this.confirmBtn.textContent = "Save Session";
  }

  public setOnConfirm(callback: (name: string) => Promise<void>) {
    this.onConfirm = callback;
  }

  public setOnCancel(callback: () => void) {
    this.onCancel = callback;
  }
}
