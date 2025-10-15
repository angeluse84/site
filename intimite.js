// openQuestions.js (ESM)
export const OPEN_QUESTIONS = [
  { id: 1,  text: "Si vous aviez le choix, qui, dans le monde entier aimeriez-vous inviter à partager un repas ?" },
  { id: 2,  text: "Si vous étiez célèbre, pour quelle raison voudriez-vous l’être ?" },
  { id: 3,  text: "Lorsque vous faites un appel téléphonique, prévoyez-vous ce que vous allez dire ? Pourquoi ?" },
  { id: 4,  text: "Qu'est-ce qui constituerait une journée parfaite pour vous ?" },
  { id: 5,  text: "Quand avez-vous chanté pour la dernière fois ? Pour quelqu'un d'autre ?" },
  { id: 6,  text: "Si vous pouviez vivre plus de 100 ans et conserver l'esprit ou le corps d'une personne de 30 ans pendant les 70 dernières années de votre vie, qui choisiriez-vous d’être ?" },
  { id: 7,  text: "Avez-vous une idée quelconque sur la façon dont vous allez mourir ?" },
  { id: 8,  text: "Nommez trois choses que vous avez en commun avec votre partenaire." },
  { id: 9,  text: "Pour quoi dans ta vie avez-vous le plus de gratitude ?" },
  { id: 10, text: "Si vous pouviez changer quelque chose à propos de la façon dont vous avez été élevé, qu’est-ce que ce serait ?" },
  { id: 11, text: "En quatre minutes, racontez à votre partenaire votre vie de la façon la plus détaillée possible." },
  { id: 12, text: "Si vous pouviez vous réveiller demain matin avec une qualité ou une capacité de plus, que serait-ce ?" },
  { id: 13, text: "Si une boule de cristal pouvait vous dire la vérité sur vous-même, votre vie, l'avenir ou quoi que ce soit d'autre, que voudriez-vous savoir ?" },
  { id: 14, text: "Y a-t-il quelque chose que vous avez rêvé de faire depuis longtemps ? Pourquoi ne l’avez-vous pas encore réalisée ?" },
  { id: 15, text: "Quel est le plus grand accomplissement de votre vie ?" },
  { id: 16, text: "Qu'est-ce que vous appréciez le plus dans une amitié ?" },
  { id: 17, text: "Quel est votre souvenir le plus précieux ?" },
  { id: 18, text: "Quel est votre plus terrible souvenir ?" },
  { id: 19, text: "Si vous appreniez que dans une année vous mourriez soudainement, changeriez-vous quelque chose à propos de votre vie actuelle ? Pourquoi ?" },
  { id: 20, text: "Que signifie l'amitié pour vous ?" },
  { id: 21, text: "Quels rôles l'amour et l'affection jouent-ils dans votre vie ?" },
  { id: 22, text: "Décrivez cinq caractéristiques positives de votre partenaire, une à la fois et à tour de rôle." },
  { id: 23, text: "Dans quelle mesure votre famille est-elle proche et chaleureuse ? Avez-vous l'impression que votre enfance a été plus heureuse que celle de la plupart des autres ?" },
  { id: 24, text: "Comment décririez-vous votre relation avec votre mère ?" },
  { id: 25, text: "Faites trois énoncés concrets « nous » à tour de rôle. Par exemple, « Nous sommes en train de répondre aux 36 questions de ce questionnaire »." },
  { id: 26, text: "Terminez cette phrase : « J'aimerais avoir quelqu'un avec qui je pourrais partager ... »." },
  { id: 27, text: "Si vous deviez devenir plus intime avec votre partenaire, qu’est-ce qui serait important qu’il ou elle sache sur vous ?" },
  { id: 28, text: "Dites à votre partenaire ce que vous aimez à son sujet : soyez honnête en disant des choses que vous ne pourriez pas dire à quelqu'un que vous venez de rencontrer." },
  { id: 29, text: "Partagez avec votre partenaire un moment embarrassant de votre vie." },
  { id: 30, text: "Quand avez-vous pleuré pour la dernière fois devant une autre personne ?" },
  { id: 31, text: "Dites à votre partenaire quelque chose que vous aimez sur lui ou elle." },
  { id: 32, text: "S'il y a un sujet sur lequel vous détestez que l’on plaisante, lequel ?" },
  { id: 33, text: "Si vous deviez mourir ce soir sans pouvoir communiquer avec qui que ce soit, qu'est-ce que vous regretteriez le plus de n'avoir pas dit à quelqu'un ? Pourquoi ne l’avez-vous pas encore dit ?" },
  { id: 34, text: "Votre maison, contenant tout ce que vous possédez, passe au feu. Après avoir sauvé vos proches et vos animaux de compagnie, vous avez encore le temps de sauver quelque chose. Qu'est-ce que ça serait ? Pourquoi ?" },
  { id: 35, text: "De tous les membres de votre famille, quelle mort vous troublerait le plus ? Pourquoi ?" },
  { id: 36, text: "Partagez un problème personnel et demandez conseil à votre partenaire sur la façon dont il pourrait le gérer. Demandez aussi comment il vous perçoit face à ce problème." },
  { id: 37, text: "Si vous pouviez choisir le sexe et l'apparence physique de votre enfant à naître, le feriez-vous ?" },
  { id: 38, text: "Seriez-vous prêt à avoir d'horribles cauchemars pendant un an si vous étiez récompensé par une richesse extraordinaire ?" },
  { id: 39, text: "Lors d'un voyage, votre conjoint passe une nuit avec un(e) inconnu(e), sans suite possible et impossible à savoir autrement. Voudriez-vous qu’il/elle vous en parle ?" }
];

// --- Fonctions d'initialisation & accès (better-sqlite3 recommandé) ---
export function ensureOpenQuestions(db) {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS open_questions (
      id INTEGER PRIMARY KEY,
      text TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS user_open_answers (
      user_id INTEGER NOT NULL,
      question_id INTEGER NOT NULL,
      answer TEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT (datetime('now')),
      updated_at DATETIME,
      PRIMARY KEY (user_id, question_id),
      FOREIGN KEY (question_id) REFERENCES open_questions(id)
    )
  `).run();

  const count = db.prepare(`SELECT COUNT(*) AS n FROM open_questions`).get().n;
  if (count === 0) {
    const insert = db.prepare(`INSERT INTO open_questions (id, text, sort_order) VALUES (@id, @text, @sort)`);
    const tx = db.transaction((rows) => {
      rows.forEach((q, i) => insert.run({ id: q.id, text: q.text, sort: i + 1 }));
    });
    tx(OPEN_QUESTIONS);
  }
}

export function getOpenQuestions(db) {
  return db.prepare(`SELECT id, text FROM open_questions ORDER BY sort_order ASC`).all();
}

export function getUserOpenAnswersMap(db, userId) {
  const rows = db.prepare(`SELECT question_id, answer FROM user_open_answers WHERE user_id = ?`).all(userId);
  const map = {};
  for (const r of rows) map[r.question_id] = r.answer;
  return map;
}

export function saveOpenAnswers(db, userId, answersObj) {
  const upsert = db.prepare(`
    INSERT INTO user_open_answers (user_id, question_id, answer, updated_at)
    VALUES (?, ?, ?, datetime('now'))
    ON CONFLICT(user_id, question_id)
    DO UPDATE SET answer = excluded.answer, updated_at = excluded.updated_at
  `);
  const tx = db.transaction(() => {
    for (const [qid, ans] of Object.entries(answersObj)) {
      const trimmed = (ans ?? "").toString().trim();
      if (trimmed.length > 0) upsert.run(userId, Number(qid), trimmed);
    }
  });
  tx();
}
