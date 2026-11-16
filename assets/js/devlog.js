/* DumpsterWare — devlog archive and date filters. */
(function () {
  "use strict";

  var logList = document.querySelector(".log-list");
  var archive = document.querySelector(".devlog-archive");
  if (!logList || !archive) return;

  var entries = Array.prototype.slice.call(logList.querySelectorAll(".log-entry"));
  if (!entries.length) return;

  var yearSelect = document.getElementById("archive-year");
  var monthSelect = document.getElementById("archive-month");
  var archiveList = document.getElementById("archive-list");
  var status = document.getElementById("archive-status");
  var clearButton = archive.querySelector(".archive-clear");
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  var items = [];
  entries.forEach(function (entry) {
    var time = entry.querySelector("time[datetime]");
    if (!time) return;
    var parts = time.getAttribute("datetime").split("-");
    if (parts.length !== 3) return;
    items.push({
      entry: entry,
      year: Number(parts[0]),
      month: Number(parts[1])
    });
  });

  if (!items.length) return;

  var groups = {};
  items.forEach(function (item) {
    groups[item.year] = groups[item.year] || {};
    groups[item.year][item.month] = groups[item.year][item.month] || [];
    groups[item.year][item.month].push(item);
  });

  var years = Object.keys(groups)
    .map(Number)
    .sort(function (a, b) {
      return b - a;
    });

  years.forEach(function (year) {
    var option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    yearSelect.appendChild(option);
  });

  function monthsFor(year) {
    return Object.keys(groups[year] || {})
      .map(Number)
      .sort(function (a, b) {
        return b - a;
      });
  }

  function fillMonths(year, selected) {
    monthSelect.innerHTML = '<option value="">All months</option>';
    if (year) {
      monthsFor(year).forEach(function (month) {
        var option = document.createElement("option");
        option.value = String(month);
        option.textContent = monthNames[month - 1] + " (" + groups[year][month].length + ")";
        monthSelect.appendChild(option);
      });
    }
    monthSelect.value = selected ? String(selected) : "";
  }

  function buildArchive() {
    archiveList.innerHTML = "";
    years.forEach(function (year) {
      var yearItem = document.createElement("li");
      var heading = document.createElement("h3");
      heading.textContent = String(year);
      yearItem.appendChild(heading);

      var months = document.createElement("ul");
      monthsFor(year).forEach(function (month) {
        var monthItem = document.createElement("li");
        var link = document.createElement("a");
        link.href = "?year=" + year + "&month=" + month;
        link.dataset.year = String(year);
        link.dataset.month = String(month);
        link.innerHTML = monthNames[month - 1] + " <span>" + groups[year][month].length + "</span>";
        monthItem.appendChild(link);
        months.appendChild(monthItem);
      });

      yearItem.appendChild(months);
      archiveList.appendChild(yearItem);
    });
  }

  function updateArchiveState(year, month) {
    archiveList.querySelectorAll("a").forEach(function (link) {
      var active = Number(link.dataset.year) === year && Number(link.dataset.month) === month;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  function updateUrl(year, month) {
    var params = new URLSearchParams();
    if (year) params.set("year", String(year));
    if (month) params.set("month", String(month));
    var query = params.toString();
    try {
      history.replaceState(null, "", location.pathname + (query ? "?" + query : "") + location.hash);
    } catch (err) {
      /* file:// and other restricted contexts can reject this */
    }
  }

  function filterEntries(year, month) {
    var shown = 0;
    items.forEach(function (item) {
      var match = (!year || item.year === year) && (!month || item.month === month);
      item.entry.hidden = !match;
      if (match) shown++;
    });

    if (shown === 0) {
      status.textContent = "No notes from that date yet.";
    } else if (year && month) {
      status.textContent =
        "Showing " + shown + " note" + (shown === 1 ? "" : "s") + " from " + monthNames[month - 1] + " " + year + ".";
    } else if (year) {
      status.textContent = "Showing " + shown + " note" + (shown === 1 ? "" : "s") + " from " + year + ".";
    } else {
      status.textContent = "Showing all " + shown + " notes.";
    }

    clearButton.hidden = !year && !month;
    updateArchiveState(year, month);
    updateUrl(year, month);
  }

  function apply(year, month) {
    year = year ? Number(year) : 0;
    month = month ? Number(month) : 0;
    if (!groups[year]) year = 0;
    if (year && month && !groups[year][month]) month = 0;

    fillMonths(year, month);
    yearSelect.value = year ? String(year) : "";
    filterEntries(year, month);
  }

  yearSelect.addEventListener("change", function () {
    apply(yearSelect.value, 0);
  });

  monthSelect.addEventListener("change", function () {
    apply(yearSelect.value, monthSelect.value);
  });

  archiveList.addEventListener("click", function (event) {
    var link = event.target.closest("a[data-year]");
    if (!link) return;
    event.preventDefault();
    apply(link.dataset.year, link.dataset.month);
  });

  clearButton.addEventListener("click", function () {
    apply(0, 0);
  });

  buildArchive();

  var params = new URLSearchParams(location.search);
  apply(params.get("year"), params.get("month"));
})();
