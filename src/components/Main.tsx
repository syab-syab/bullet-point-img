import React, { useState } from 'react'
import styled from 'styled-components'
import html2canvas from 'html2canvas'

const Wrapper = styled.div`
  background: #B2B377;
  padding: 5rem 40rem;
  height: auto;
  @media (max-width: 1100px) {
    padding: 5rem 30rem;
  }
  @media (max-width: 1000px) {
    padding: 5rem 25rem;
  }
  @media (max-width: 900px) {
    padding: 5rem 20rem;
  }
  @media (max-width: 800px) {
    padding: 5rem 15rem;
  }
  @media (max-width: 700px) {
    padding: 5rem 10rem;
  }
  @media (max-width: 600px) {
    padding: 5rem;
  }
`

const SubWrapper = styled.div`
  margin: 0;
  padding: 0;
`

const TextArea = styled.textarea`
  font-size: 2rem;
  width: 100%;
  height: 25rem;
  border: 0.3rem solid black;
  resize: none;
  padding: 1rem;
`

const Capture = styled.section`
  font-size: 2rem;
  width: 100%;
  min-height: 25rem;
  border: 0.3rem solid black;
  overflow-wrap: break-word;
  text-align: left;
  background: white;
  padding: 1rem;
`

// ボタン

const BtnWrapper = styled.div`
  display: flex;
  margin: 3rem 0;
`

const Btn = styled.button`
  background: #F3D0D7;
  flex-grow: 1;
  font-size: 2rem;
  font-weight: bold;
  border: 0.1rem solid black;
  cursor: pointer;
`

// 画像化

const nonDisplay = "display: none;"

const btnColor = "color: black;"

const ImgCreateBtn = styled.button<{$isPreview?: boolean}>`
  ${props => props.$isPreview ? btnColor : nonDisplay};
  margin: 3rem 0;
  background: #F3D0D7;
  flex-grow: 1;
  font-size: 2rem;
  font-weight: bold;
  border: 0.1rem solid black;
  cursor: pointer;
`

const MakeImageSectionWrapper = styled.div`
  margin: 0;
  padding: 0;
`

const MakeImageSection = styled.section<{$isDownload?: boolean}>`
  width: 100%;
  ${props => props.$isDownload ? btnColor : nonDisplay};
`

const ImageDownloadButtonSection = styled.section<{$isDownload?: boolean}>`
  ${props => props.$isDownload ? btnColor : nonDisplay};
  margin-top: 3rem;
`

const ImageDownloadLink = styled.a`
  background: #F3D0D7;
  font-size: 2rem;
  font-weight: bold;
  border: 0.1rem solid black;
  text-decoration: none;
  color: black;
  padding: 0.3rem;
`

const Main = () => {
  const [sentence, setSentence] = useState<string>("")

  const [preview, setPreview] = useState<boolean>(false)

  const [imgSentence, setImgSentence] = useState<Array<string>>([])

  const [download, setDownload] = useState<boolean>(false)

  const textContent = () => {
    if (sentence.length <= 0) {
      alert("文章を入力してください。")
    } else {
      const newWords: Array<string> = sentence.includes("\n") ? sentence.split("\n") : [sentence]
      setImgSentence(newWords)
      setPreview(true)      
    }
  }

  const createScreenshot = (): void => {
    // オプションの指定
    const options = {
    // 画質を良くする
      scale: 3
    }
    const capture: any = document.getElementById("capture")
    // フォームに入力したら画像を表示
    html2canvas(capture, options).then(function(canvas) {
      //imgのsrcに、生成した画像urlを入れて表示。
      const imgData: string = canvas.toDataURL();
      const createImage: any = document.getElementById("created-image");
      // console.log(imgData)
      createImage.src = imgData;
      // 表示される画像のサイズの調整
      createImage.width = capture.clientWidth;
      // aタグのhrefに生成した画像を入れてダウンロードできるようにする
      const imageDownload: any = document.getElementById("image-download");
      imageDownload.href = imgData;
    });
    setDownload(true)
  }

  return (
    <Wrapper>
      <SubWrapper>
        <TextArea value={sentence} onChange={(e) => setSentence(e.target.value)} />

        <BtnWrapper>
          <Btn onClick={textContent}>プレビュー</Btn>
          <Btn onClick={() => setSentence("")}>クリア</Btn>
        </BtnWrapper>

        <Capture id='capture'>
        <ul>
        {
          imgSentence.map((s, index) => {
            return <li key={index}>{s}</li>
          })
        }
        </ul>
        </Capture>

        <ImgCreateBtn $isPreview={preview} onClick={createScreenshot}>画像にする</ImgCreateBtn>
      </SubWrapper>

      <MakeImageSectionWrapper>
        <MakeImageSection id="make-image-section" $isDownload={download}>
          <div id="image-space">
            <img src="" id="created-image" alt='created-image' />
          </div>
        </MakeImageSection>
      </MakeImageSectionWrapper>

      <ImageDownloadButtonSection id="image-download-button-section"  $isDownload={download}>
        <ImageDownloadLink href="" id="image-download" download="screenshot">画像ダウンロード</ImageDownloadLink>
      </ImageDownloadButtonSection>
    </Wrapper>
  )
}

export default Main