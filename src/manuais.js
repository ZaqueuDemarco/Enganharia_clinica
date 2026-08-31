function renderManuais(lista) {
  const ul = document.getElementById("lista");
  const vazio = document.getElementById("vazio");

  ul.innerHTML = "";

  if (lista.length === 0) {
    vazio.hidden = false;
    return;
  }
  vazio.hidden = true;

  for (const m of lista) {
    const li = document.createElement("li");
    li.className = "item";

    const info = document.createElement("div");
    info.className = "item-info";

    const nome = document.createElement("span");
    nome.className = "item-nome";
    nome.textContent = m.equipamento;

    const meta = document.createElement("span");
    meta.className = "item-meta";
    meta.textContent = `${m.fabricante} · ${m.tipo}`;

    info.append(nome, meta);
    li.append(info);

    if (m.link) {
      const a = document.createElement("a");
      a.className = "item-link";
      a.href = m.link;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "Abrir manual";
      li.append(a);
    } else {
      const span = document.createElement("span");
      span.className = "item-indisponivel";
      span.textContent = "Manual indisponível";
      li.append(span);
    }

    ul.appendChild(li);
  }
}

function filtrarManuais(termo) {
  const t = termo.trim().toLowerCase();
  if (!t) return MANUAIS;
  return MANUAIS.filter((m) =>
    [m.equipamento, m.fabricante, m.tipo].some((campo) =>
      campo.toLowerCase().includes(t)
    )
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderManuais(MANUAIS);
  document.getElementById("pesquisa").addEventListener("input", (e) => {
    renderManuais(filtrarManuais(e.target.value));
  });
});
