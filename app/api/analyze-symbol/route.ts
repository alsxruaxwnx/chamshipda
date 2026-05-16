import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { symbolData } = await request.json();

    if (!symbolData) {
      return NextResponse.json(
        { error: 'No symbol data provided' },
        { status: 400 }
      );
    }

    // 기호별 코드 생성 로직
    const codeMap: Record<string, string> = {
      square: 'const shape = new Square();',
      circle: 'const shape = new Circle();',
      triangle: 'const shape = new Triangle();',
    };

    const generatedCode = codeMap[symbolData.type] || 'const shape = new Shape();';

    return NextResponse.json({
      code: generatedCode,
      symbol: symbolData,
      message: 'Symbol analyzed successfully',
    });
  } catch (error) {
    console.error('Error analyzing symbol:', error);
    return NextResponse.json(
      { error: 'Failed to analyze symbol' },
      { status: 500 }
    );
  }
}
