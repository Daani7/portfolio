import { Controller } from "@hotwired/stimulus"
import Highcharts from "highcharts"

export default class extends Controller {
  static targets = [
    // Tabs & Grid
    "tabBtn", "tabContent", "proCard", "playgroundPane",
    
    // Highcharts targets
    "hrPieChart", "hrColumnChart",
    "categoryFilterBtn", "optionFilterBtn"
  ]

  connect() {
    this.initState()
    this.initHrData()
  }

  initState() {
    this.activeTab = "personal"
    this.activeProProject = "maglev"
    this.activeCategory = "ensemble"
    this.activeOption = "all"
  }

  /* ======================================================
     1. MAIN TABS SWITCHING
     ====================================================== */
  switchTab(event) {
    const tabName = event.currentTarget.dataset.tabName
    if (tabName === this.activeTab) return

    this.activeTab = tabName

    // Update buttons class
    this.tabBtnTargets.forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.tabName === tabName)
    })

    // Update contents visibility
    this.tabContentTargets.forEach(content => {
      content.classList.toggle("d-none", content.dataset.tabName !== tabName)
      if (content.dataset.tabName === tabName) {
        content.classList.remove("d-none")
      }
    })

    // Trigger charts reflow if switching to professional tab
    if (tabName === "professional") {
      this.reflowCharts()
    }
  }

  /* ======================================================
     2. PROFESSIONAL PROJECT CARD SELECTION
     ====================================================== */
  selectProject(event) {
    const projectId = event.currentTarget.dataset.projectId
    if (projectId === this.activeProProject) return

    this.activeProProject = projectId

    // Update card styling
    this.proCardTargets.forEach(card => {
      card.classList.toggle("is-active", card.dataset.projectId === projectId)
    })

    // Update playground view
    this.playgroundPaneTargets.forEach(pane => {
      const show = pane.dataset.projectId === projectId
      pane.classList.toggle("d-none", !show)
      if (show && projectId === "hr") {
        this.reflowCharts()
      }
    })
  }

  reflowCharts() {
    setTimeout(() => {
      if (this.pieChart) this.pieChart.reflow()
      if (this.columnChart) this.columnChart.reflow()
    }, 100)
  }

  /* ======================================================
     3. HR AFFILIATION & HIGHCHARTS PLAYGROUND
     ====================================================== */
  initHrData() {
    // Structured data based on category and option
    // Format: Category -> Option -> { affiliation: [...], ages: [...] }
    this.hrData = {
      ensemble: {
        all: {
          affiliation: [
            { name: 'Affiliés', y: 154, color: '#60a5fa' },
            { name: 'Non affiliés', y: 32, color: '#c084fc' },
            { name: 'Dispensés', y: 18, color: '#f43f5e' }
          ],
          ages: [40, 75, 59, 30] // -30 ans, 30-45 ans, 45-55 ans, +55 ans
        },
        avec_option: {
          affiliation: [
            { name: 'Affiliés', y: 110, color: '#60a5fa' },
            { name: 'Non affiliés', y: 0, color: '#c084fc' },
            { name: 'Dispensés', y: 0, color: '#f43f5e' }
          ],
          ages: [20, 50, 45, 15]
        },
        sans_option: {
          affiliation: [
            { name: 'Affiliés', y: 44, color: '#60a5fa' },
            { name: 'Non affiliés', y: 32, color: '#c084fc' },
            { name: 'Dispensés', y: 18, color: '#f43f5e' }
          ],
          ages: [20, 25, 14, 15]
        }
      },
      cadres: {
        all: {
          affiliation: [
            { name: 'Affiliés', y: 48, color: '#60a5fa' },
            { name: 'Non affiliés', y: 4, color: '#c084fc' },
            { name: 'Dispensés', y: 2, color: '#f43f5e' }
          ],
          ages: [5, 22, 18, 9]
        },
        avec_option: {
          affiliation: [
            { name: 'Affiliés', y: 42, color: '#60a5fa' },
            { name: 'Non affiliés', y: 0, color: '#c084fc' },
            { name: 'Dispensés', y: 0, color: '#f43f5e' }
          ],
          ages: [3, 18, 16, 5]
        },
        sans_option: {
          affiliation: [
            { name: 'Affiliés', y: 6, color: '#60a5fa' },
            { name: 'Non affiliés', y: 4, color: '#c084fc' },
            { name: 'Dispensés', y: 2, color: '#f43f5e' }
          ],
          ages: [2, 4, 2, 4]
        }
      },
      non_cadres: {
        all: {
          affiliation: [
            { name: 'Affiliés', y: 106, color: '#60a5fa' },
            { name: 'Non affiliés', y: 28, color: '#c084fc' },
            { name: 'Dispensés', y: 16, color: '#f43f5e' }
          ],
          ages: [35, 53, 41, 21]
        },
        avec_option: {
          affiliation: [
            { name: 'Affiliés', y: 68, color: '#60a5fa' },
            { name: 'Non affiliés', y: 0, color: '#c084fc' },
            { name: 'Dispensés', y: 0, color: '#f43f5e' }
          ],
          ages: [17, 32, 29, 10]
        },
        sans_option: {
          affiliation: [
            { name: 'Affiliés', y: 38, color: '#60a5fa' },
            { name: 'Non affiliés', y: 28, color: '#c084fc' },
            { name: 'Dispensés', y: 16, color: '#f43f5e' }
          ],
          ages: [18, 21, 12, 11]
        }
      }
    }
  }

  filterCategory(event) {
    const category = event.currentTarget.dataset.category
    if (category === this.activeCategory) return

    this.activeCategory = category

    // Update button classes
    this.categoryFilterBtnTargets.forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.category === category)
    })

    this.updateCharts()
  }

  filterOption(event) {
    const option = event.currentTarget.dataset.option
    if (option === this.activeOption) return

    this.activeOption = option

    // Update button classes
    this.optionFilterBtnTargets.forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.option === option)
    })

    this.updateCharts()
  }

  updateCharts() {
    if (!this.pieChart || !this.columnChart) return

    const data = this.hrData[this.activeCategory][this.activeOption]

    // Update Pie chart
    this.pieChart.series[0].setData(data.affiliation)

    // Update Column chart
    this.columnChart.series[0].setData(data.ages)

    // Show feedback toast
    const catLabel = this.activeCategory === "ensemble" ? "Ensemble" : (this.activeCategory === "cadres" ? "Cadres" : "Non-cadres")
    const optLabel = this.activeOption === "all" ? "Tous" : (this.activeOption === "avec_option" ? "Avec Option" : "Sans Option")
    this.showToastNotification(`Filtres : ${catLabel} | Option : ${optLabel}`)
  }

  initChartsContainer() {
    if (this.pieChart && this.columnChart) return

    const currentDataSet = this.hrData[this.activeCategory][this.activeOption]

    // Initialize Pie Chart (Affiliation status)
    this.pieChart = Highcharts.chart(this.hrPieChartTarget, {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        style: { fontFamily: "'Inter', sans-serif" },
        height: 300
      },
      title: {
        text: 'Statut d\'affiliation',
        style: { color: '#f0f0f5', fontSize: '14px', fontWeight: '600' }
      },
      credits: { enabled: false },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f}%)</b>'
      },
      accessibility: {
        point: { valueSuffix: '%' }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y}',
            style: { color: '#7a829e', fontSize: '10px', textOutline: 'none' }
          },
          borderWidth: 0
        }
      },
      series: [{
        name: 'Salariés',
        colorByPoint: true,
        data: currentDataSet.affiliation
      }]
    })

    // Initialize Column Chart (Age brackets)
    this.columnChart = Highcharts.chart(this.hrColumnChartTarget, {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        style: { fontFamily: "'Inter', sans-serif" },
        height: 300
      },
      title: {
        text: 'Répartition par tranche d\'âge',
        style: { color: '#f0f0f5', fontSize: '14px', fontWeight: '600' }
      },
      credits: { enabled: false },
      xAxis: {
        categories: ['-30 ans', '30-45 ans', '45-55 ans', '+55 ans'],
        labels: { style: { color: '#7a829e' } },
        lineColor: 'rgba(255,255,255,0.08)'
      },
      yAxis: {
        title: { text: 'Nombre de salariés', style: { color: '#7a829e' } },
        labels: { style: { color: '#7a829e' } },
        gridLineColor: 'rgba(255, 255, 255, 0.05)',
        lineWidth: 0
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y} salariés</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
        backgroundColor: '#0a0521',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 10,
        style: { color: '#f0f0f5' }
      },
      plotOptions: {
        column: {
          borderRadius: 5,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Effectifs',
        data: currentDataSet.ages,
        color: '#60a5fa'
      }]
    })
  }

  playgroundPaneTargetConnected(element) {
    if (element.dataset.projectId === "hr") {
      setTimeout(() => {
        this.initChartsContainer()
        this.reflowCharts()
      }, 100)
    }
  }

  /* ======================================================
     UTILITY: DYNAMIC TOAST SYSTEM
     ====================================================== */
  showToastNotification(message) {
    let container = document.querySelector(".toast-container-custom")
    if (!container) {
      container = document.createElement("div")
      container.className = "toast-container-custom"
      document.body.appendChild(container)
    }

    const toast = document.createElement("div")
    toast.className = "toast-custom"
    toast.innerHTML = `
      <i class="fas fa-check-circle" style="color: var(--accent-cyan);"></i>
      <span>${message}</span>
    `
    container.appendChild(toast)

    setTimeout(() => {
      toast.style.animation = "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse"
      toast.style.opacity = "0"
      setTimeout(() => {
        toast.remove()
      }, 300)
    }, 2700)
  }
}
