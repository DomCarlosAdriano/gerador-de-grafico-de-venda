const mesesInput = document.querySelector("#meses");
const vendaInput = document.querySelector("#venda");
const btnAdd = document.querySelector("#adiciona");
const jan = document.querySelector(".jan1");
const fev = document.querySelector(".fev1");
const mar = document.querySelector(".mar1");
const abr = document.querySelector(".abr1");
const maio = document.querySelector(".maio1");
const jun = document.querySelector(".jun1");
const jul = document.querySelector(".jul1");
const ago = document.querySelector(".ago1");
const set = document.querySelector(".set1");
const out = document.querySelector(".out1");
const nov = document.querySelector(".nov1");
const dez = document.querySelector(".dez1");
const grafico = document.querySelector(".grafico");
const canvas = document.querySelector("#myChart");
const pdf = document.querySelector("#pdf");

// adicionar elementos na tabela
btnAdd.addEventListener("click", () => {
  let mes = mesesInput.options[mesesInput.selectedIndex].value;
  var nDeVendas = vendaInput.value;
  
    if (
    vendaInput.value <= -1 ||
    vendaInput.value === isNaN ||
    vendaInput.value === ""
  ) {
    nDeVendas = 0;
  }

  let div = document.querySelector("." + mes + 1);
  div.innerText = `R$ ${nDeVendas}`;
  div.setAttribute("id", nDeVendas);

  vendaInput.value = "";
  canvas.remove();

  chart();
});

// chart
function chart() {
  grafico.innerHTML = `
  <canvas id="myChart" width="790" height="395" style="display: block; box-sizing: border-box; height: 263px; width: 526px;"></canvas>
  `;

  const ctx = document.getElementById("myChart");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Maio",
        "Jun",
        "jal",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez"
      ],
      datasets: [
        {
          label: "VENDAS",
          data: [
            Number(jan.id),
            Number(fev.id),
            Number(mar.id),
            Number(abr.id),
            Number(maio.id),
            Number(jun.id),
            Number(jul.id),
            Number(ago.id),
            Number(set.id),
            Number(out.id),
            Number(nov.id),
            Number(dez.id)
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

chart();

// PDF

pdf.addEventListener("click", () => {
  let text = `
  RELATORIO DE VENDAS 

  Janeirro foi vendido : R$ ${Number(jan.id)}
  Fevereiro foi vendido : R$ ${Number(fev.id)}
  Março foi vendido : R$ ${Number(mar.id)}
  Abril foi vendido : R$ ${Number(abr.id)}
  Maio foi vendido : R$ ${Number(maio.id)}
  Junho foi vendido : R$ ${Number(jun.id)}
  Julho foi vendido : R$ ${Number(jul.id)}
  Agosto foi vendido : R$ ${Number(ago.id)}
  Setembro foi vendido : R$ ${Number(set.id)}
  Outubro foi vendido : R$ ${Number(out.id)}
  Novembro foi vendido : R$ ${Number(nov.id)}
  Dezembro foi vendido : R$ ${Number(dez.id)}
  `;

  const canvasImg = document.querySelector("#myChart");
  const image = canvasImg.toDataURL();
  var img = new Image();
  img.src = image;

  var doc = new jsPDF();
  doc.text(`${text}`, 10, 10);
  doc.addImage(img, "JPEG", 15, 130, 180, 100);
  doc.save("relatorio.pdf");
});
