export default function MessageSection() {
  return (
    <section className="message-section" id="thong-diep" aria-labelledby="message-title">
      <div className="message-inner">
        <div className="message-copy">
          <p className="message-eyebrow"><span aria-hidden="true">✦</span> TINH THẦN LEARNSPACE</p>
          <h2 id="message-title">Không cần biết tất cả.<br /><span>Chỉ cần luôn muốn học hỏi.</span></h2>
          <p className="message-description">Mỗi người bắt đầu với một nền tảng khác nhau, nhưng ai cũng có thể tiếp tục tiến bộ. LearnSpace tin rằng tri thức có giá trị hơn khi được khám phá, lưu giữ và sẻ chia.</p>
          <p className="message-community"><svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4.5 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM19.5 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM12 12c-4 0-7 2-7 5v4h14v-4c0-3-3-5-7-5ZM3.5 12C1.5 12 0 14 0 16v3h3v-2c0-1.8.7-3.3 2-4.5L3.5 12ZM20.5 12l-1.5.5c1.3 1.2 2 2.7 2 4.5v2h3v-3c0-2-1.5-4-3.5-4Z" /></svg><span>Học theo cách riêng. Phát triển cùng cộng đồng.</span></p>
        </div>
        <div className="message-visual"><img src="/mascot-message.png" alt="Linh vật LearnSpace đeo tai nghe đỏ, ngồi đọc sách cạnh chồng sách và chậu cây, với các biểu tượng ý tưởng và học tập" width="1024" height="1024" loading="lazy" /><span className="message-spark" aria-hidden="true">✦</span></div>
      </div>
      <svg className="message-waves" viewBox="0 0 1440 180" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M0 50C130-10 170 150 350 110S550 175 740 90 1000-20 1180 50 1350 0 1440 20V180H0Z" fill="#ffd8dc" fillOpacity=".65" /><path d="M0 140C160 110 230 200 420 150S650 90 840 135 1020 190 1170 115 1350 120 1440 140V180H0Z" fill="#ffe9ec" /></svg>
    </section>
  );
}
