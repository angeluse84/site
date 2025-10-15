<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Pulse — Ennéagramme</title>
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <header class="site-header small">
    <div class="brand">
      <img src="assets/logo.svg" alt="Pulse logo" class="logo" />
      <h1>Pulse</h1>
    </div>
    <nav class="nav">
      <button class="nav-btn" data-target="index.html">Accueil</button>
      <button class="nav-btn" data-target="match.html">Match</button>
      <button class="nav-btn" data-target="inscription.html">Inscription</button>
    </nav>
  </header>

  <main class="container narrow">
    <section class="card">
      <h2>Ton test Ennéagramme (unique)</h2>
      <p class="muted">
        Il n'y a **qu'un seul** test Ennéagramme par utilisateur dans cette application. Enregistrer un nouveau test écrase l'ancien.
      </p>

      <form id="enneaForm" class="form-card" onsubmit="return false;">
        <div id="enneaInputs" style="display:grid;gap:10px"></div>

        <div class="form-actions" style="margin-top:12px;">
          <button id="saveBtn" class="primary" type="button">Enregistrer mon Ennéagramme</button>
          <button id="importBtn" class="secondary" type="button">Charger depuis pulse_enneagramme</button>
          <button id="clearBtn" class="btn-link" type="button">Supprimer mon test</button>
        </div>

        <div id="status" style="margin-top:12px" class="muted"></div>

        <div style="margin-top:12px" id="previewCard"></div>
      </form>
    </section>
  </main>

  <footer class="site-footer"><small>© Pulse — Prototype</small></footer>

  <script>
    // clé unique pour l'ennéagramme dans l'app
    const ENNEA_KEY = 'pulse_enneagramme';

    const labels = [
      "1 — Perfectionniste", "2 — Altruiste", "3 — Performeur", "4 — Individualiste",
      "5 — Observateur", "6 — Loyal", "7 — Epicurien", "8 — Challenger", "9 — Pacificateur"
    ];

    function buildInputs() {
      const container = document.getElementById('enneaInputs');
      container.innerHTML = '';
      const saved = loadEnnea() || Array(9).fill(3);
      labels.forEach((label, idx) => {
        const id = `ennea-${idx+1}`;
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
          <label for="${id}">${label}</label>
          <div style="display:flex;gap:8px;align-items:center">
            <input id="${id}" type="range" min="1" max="5" step="1" value="${saved[idx]}" style="flex:1" />
            <output id="${id}-out" style="width:40px;text-align:center">${saved[idx]}</output>
          </div>
        `;
        container.appendChild(wrapper);
        const input = wrapper.querySelector('input');
        const out = wrapper.querySelector('output');
        input.addEventListener('input', () => out.value = input.value);
      });
    }

    function readEnneaFromInputs() {
      const arr = [];
      for (let i=1;i<=9;i++){
        const el = document.getElementById(`ennea-${i}`);
        arr.push(Number(el.value));
      }
      return arr;
    }

    function loadEnnea(){
      try { const raw = localStorage.getItem(ENNEA_KEY); return raw ? JSON.parse(raw) : null; }
      catch(e){ return null; }
    }

    function saveEnnea(arr){
      localStorage.setItem(ENNEA_KEY, JSON.stringify(arr));
    }

    function clearEnnea(){
      localStorage.removeItem(ENNEA_KEY);
    }

    function renderPreview(arr){
      const area = document.getElementById('previewCard');
      if (!arr) { area.innerHTML = '<div class="muted">Aucun test enregistré.</div>'; return; }
      area.innerHTML = `
        <div class="card" style="padding:12px">
          <h4>Résumé de ton Ennéagramme</h4>
          <div class="muted" style="margin-top:6px">${arr.map((v,i)=>`T${i+1}:${v}`).join(' • ')}</div>
        </div>
      `;
    }

    document.addEventListener('DOMContentLoaded', () => {
      buildInputs();
      renderPreview(loadEnnea());
      const status = document.getElementById('status');

      document.getElementById('saveBtn').addEventListener('click', () => {
        const arr = readEnneaFromInputs();
        saveEnnea(arr);
        renderPreview(arr);
        status.textContent = 'Ennéagramme enregistré (clé unique pulse_enneagramme).';
        setTimeout(()=> status.textContent = '', 3000);
      });

      document.getElementById('importBtn').addEventListener('click', () => {
        const arr = loadEnnea();
        if (!arr) { alert('Aucun ennéagramme trouvé.'); return; }
        // remplir les inputs
        for (let i=1;i<=9;i++){
          const el = document.getElementById(`ennea-${i}`);
          el.value = arr[i-1];
          document.getElementById(`ennea-${i}-out`).value = arr[i-1];
        }
        renderPreview(arr);
        status.textContent = 'Ennéagramme importé dans le formulaire.';
        setTimeout(()=> status.textContent = '', 2500);
      });

      document.getElementById('clearBtn').addEventListener('click', () => {
        if (!confirm('Supprimer ton test Ennéagramme ? Cette action est irréversible.')) return;
        clearEnnea();
        buildInputs();
        renderPreview(null);
        status.textContent = 'Ennéagramme supprimé.';
        setTimeout(()=> status.textContent = '', 2500);
      });
    });
  </script>

  <script src="js/main.js"></script>
</body>
</html>
