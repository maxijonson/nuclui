import { Container } from "nuclui";
import React from "react";

const Benchmark = React.memo(() => {
    return (
        <>
            A page to benchmark individual components
            <Container maxWidth="lg" fixed>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
                laboriosam atque accusamus nostrum officiis. Facilis nemo quos
                quisquam fuga libero alias aspernatur, quibusdam fugiat atque
                doloremque. Corporis exercitationem ipsum vero. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Nobis hic totam
                quisquam veniam vel ad dolore soluta rerum suscipit fugit nam,
                mollitia, repellat dolor blanditiis! Delectus unde amet
                reiciendis. Rerum. Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Velit laboriosam atque accusamus nostrum
                officiis. Facilis nemo quos quisquam fuga libero alias
                aspernatur, quibusdam fugiat atque doloremque. Corporis
                exercitationem ipsum vero. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nobis hic totam quisquam veniam
                vel ad dolore soluta rerum suscipit fugit nam, mollitia,
                repellat dolor blanditiis! Delectus unde amet reiciendis. Rerum.
            </Container>
        </>
    );
});

export default Benchmark;
