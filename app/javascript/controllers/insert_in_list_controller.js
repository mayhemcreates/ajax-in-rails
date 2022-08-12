import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="insert-in-list"
export default class extends Controller {
  static targets = ["items", "form"]
  static values = { position: String } // Add this


  connect() {
      // console.log(this.element)
      // console.log(this.itemsTarget)
      // console.log(this.formTarget)
      this.csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content")
  }

  send (event) {
    event.preventDefault()
    const url = this.formTarget.action
    const options = {
      method: "POST",
      headers: { "Accept": "application/json", "X-CSRF-Token": this.csrfToken },
      body: new FormData(this.formTarget)
    }
    fetch(this.formTarget.action, {
      method: "POST",
      headers: { "Accept": "application/json", "X-CSRF-Token": this.csrfToken },
      body: new FormData(this.formTarget)
    })
      .then(response => response.json())
      .then((data) => {
        if (data.inserted_item) {
          this.itemsTarget.insertAdjacentHTML(this.positionValue, data.inserted_item)
        }
        this.formTarget.outerHTML = data.form
      })
  }

}
