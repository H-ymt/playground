class DropdownMenu {
  constructor(trigger, dropdownList) {
    this.trigger = trigger;
    this.dropdownList = dropdownList;
    this.dropdownItems = Array.from(
      this.dropdownList.querySelectorAll(".js-dropdownListItem"),
    );
    this.isExpanded = false;
    this.currentIndex = 0;

    this.initializeEvents();
  }

  initializeEvents() {
    // クリックした時の処理
    this.trigger.addEventListener("click", this.toggleDropdown.bind(this));

    // フォーカスが外れたときの処理
    this.dropdownList.addEventListener(
      "focusout",
      this.handleFocusOut.bind(this),
    );

    // ドロップダウンメニュー以外がクリックされた時の処理
    document.addEventListener("click", this.handleOutsideClick.bind(this));

    // escキー押下時の処理
    document.addEventListener("keydown", this.handleEscapeKey.bind(this));

    // ドロップダウンメニューの中を矢印キーで移動できるようにする
    this.dropdownList.addEventListener(
      "keydown",
      this.handleKeyDown.bind(this),
    );

    // フォーカスが移動した際の処理
    this.dropdownList.addEventListener(
      "focus",
      this.handleFocus.bind(this),
      true,
    );

    // 初回フォーカスを設定
    if (this.dropdownItems.length > 0) {
      this.dropdownItems[this.currentIndex].firstElementChild.focus();
    }
  }

  toggleDropdown() {
    this.toggleAriaExpanded(!this.isExpanded); // 現在の状態を反転
  }

  toggleAriaExpanded(expanded) {
    this.trigger.setAttribute("aria-expanded", expanded);
    this.isExpanded = expanded; // メニューの開閉状態を更新

    // メニューを開いたときにフォーカスを当てる
    if (expanded && this.dropdownItems.length > 0) {
      this.dropdownItems[this.currentIndex].firstElementChild.focus();
    }
  }

  handleFocusOut(event) {
    if (
      !this.dropdownList.contains(event.relatedTarget) &&
      !this.trigger.contains(event.relatedTarget)
    ) {
      this.toggleAriaExpanded(false);
    }
  }

  handleOutsideClick(event) {
    if (
      !this.dropdownList.contains(event.target) &&
      !this.trigger.contains(event.target)
    ) {
      this.toggleAriaExpanded(false);
    }
  }

  handleEscapeKey(event) {
    if (event.key === "Escape") {
      this.toggleAriaExpanded(false);
    }
  }

  handleKeyDown(event) {
    const { key } = event;

    // 矢印キーが押された場合のみ処理する
    if (
      key === "ArrowDown" ||
      key === "ArrowUp" ||
      key === "ArrowLeft" ||
      key === "ArrowRight"
    ) {
      event.preventDefault(); // スクロールを防ぐ

      // 矢印キーに応じてインデックスを更新
      if (key === "ArrowDown") {
        this.currentIndex = (this.currentIndex + 1) % this.dropdownItems.length;
      } else if (key === "ArrowUp") {
        this.currentIndex =
          (this.currentIndex - 1 + this.dropdownItems.length) %
          this.dropdownItems.length;
      } else if (key === "ArrowLeft") {
        this.currentIndex =
          (this.currentIndex - 1 + this.dropdownItems.length) %
          this.dropdownItems.length;
      } else if (key === "ArrowRight") {
        this.currentIndex = (this.currentIndex + 1) % this.dropdownItems.length;
      }

      // 新しいフォーカスを設定
      this.dropdownItems[this.currentIndex].firstElementChild.focus();
    }
  }

  handleFocus(event) {
    const target = event.target;
    if (this.dropdownItems.some((item) => item.contains(target))) {
      // ドロップダウンメニュー内にフォーカスがある場合の処理
    }
  }
}

export default function initializeDropdown() {
  const dropdownTriggers = document.querySelectorAll(".js-dropdownTrigger");
  const dropdownLists = document.querySelectorAll(".js-dropdownList");

  dropdownTriggers.forEach((trigger, index) => {
    const dropdownList = dropdownLists[index];

    // ガード処理
    if (!trigger || !dropdownList) return;

    new DropdownMenu(trigger, dropdownList);
  });
}
