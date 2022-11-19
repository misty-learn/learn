# PhpSpreadsheet专项

## 一、PhpSpreadsheet使用心得

### 1、安装

> 普通安装

```shell
composer require phpoffice/phpspreadsheet
```

> 获取文档和案例安装

```shell
composer require phpoffice/phpspreadsheet --prefer-source
```

### 2、`PhpSpreadsheet` 是什么

> [info] PhpSpreadsheet是一个用纯PHP编写的库，提供了一组类，使您可以读取和写入不同的电子表格文件格式
> PhpSpreadsheet提供了丰富的API接口，可以设置诸多单元格以及文档属性，包括样式、图片、日期、函数等等诸多应用，总之你想要什么样的Excel表格，PhpSpreadsheet都能做到

- 使用 `PhpSpreadsheet` 开发的PHP要求 7.1或更高版本
- `PhpSpreadsheet` 支持链式操作

### 3、`PhpSpreadsheet` 支持的文件格式

| **格式**                                     | **读** | **写** |
| -------------------------------------------- | ------ | ------ |
| Open Document Format/OASIS (.ods)            | ✓      | ✓      |
| Office Open XML (.xlsx) Excel 2007 and above | ✓      | ✓      |
| BIFF 8 (.xls) Excel 97 and above             | ✓      | ✓      |
| BIFF 5 (.xls) Excel 95                       | ✓      |        |
| SpreadsheetML (.xml) Excel 2003              | ✓      |        |
| Gnumeric                                     | ✓      |        |
| HTML                                         | ✓      | ✓      |
| SYLK                                         | ✓      |        |
| CSV                                          | ✓      | ✓      |
| PDF                                          |        | ✓      |

### 4、`PhpSpreadsheet` 官方网址

- https://phpspreadsheet.readthedocs.io

### 5、`PhpSpreadsheet` 安装

- composer require phpoffice/phpspreadsheet

------

## 二、基础知识

### 1、载入

```php
<?php
    # 载入composer自动加载文件 require 瑞块儿
    require 'vendor/autoload.php';  autoload 奥特老特
    # 给类文件的命名空间起个别名
    use PhpOffice\PhpSpreadsheet\Spreadsheet;
    # 实例化 Spreadsheet 对象
    $spreadsheet = new Spreadsheet();
```

### 2、获取工作簿

- getActiveSheet

```php
<?php
    # 载入composer自动加载文件
    require 'vendor/autoload.php';
    # 给类文件的命名空间起个别名
    use PhpOffice\PhpSpreadsheet\Spreadsheet;
    # 实例化 Spreadsheet 对象
    $spreadsheet = new Spreadsheet();
    # 获取活动工作薄
    $sheet = $spreadsheet->getActiveSheet();
```

### 3、获取单元格

- 两种获取单元格方式
  - getCell
  - getCellByColumnAndRow

```php
<?php
    # 载入composer自动加载文件
    require 'vendor/autoload.php';
    # 给类文件的命名空间起个别名
    use PhpOffice\PhpSpreadsheet\Spreadsheet;
    # 实例化 Spreadsheet 对象
    $spreadsheet = new Spreadsheet();
    # 获取活动工作薄
    $sheet = $spreadsheet->getActiveSheet();
    # 获取单元格
    $cell = $sheet->getCell('A1');
    $cell = $sheet->getCellByColumnAndRow(1,1);
```

### 4、设置单元格

- setValue
  - 参数：单元格的值

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	# 获取单元格
	$cellA = $sheet->getCell('A1');
	# 设置单元格值
	$cellA->setValue('欧阳克');

	# 获取单元格
	$cellB = $sheet->getCellByColumnAndRow(1,2);
	# 设置单元格值
	$cellB->setValue('黄蓉');

	# 获取设置单元格，链式操作
	$sheet->getCell('A3')->setValue('郭靖');
	$sheet->getCellByColumnAndRow(1,4)->setValue('杨康');
```

### 5、获取单元格值

- getValue 获取单元格值
- getCoordinate 获取单元格坐标 可窝的奶特

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	# 获取单元格
	$cellA = $sheet->getCell('A1');
	# 设置单元格值
	$cellA->setValue('欧阳克');

	echo '值: ', $cellA->getValue(),PHP_EOL;
	echo  '坐标: ', $cellA->getCoordinate();
```

### 6、保存表格

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	# 获取单元格
	$cellA = $sheet->getCell('A1');
	# 设置单元格值
	$cellA->setValue('欧阳克');
	# 获取单元格
	$cellB = $sheet->getCellByColumnAndRow(1,2);
	# 设置单元格值
	$cellB->setValue('黄蓉');
	# 获取设置单元格，链式操作
	$sheet->getCell('A3')->setValue('郭靖');
	$sheet->getCellByColumnAndRow(1,4)->setValue('杨康');
	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');

```

------

## 三、强化单元格

### 1、设置单元格

- setCellValue
  - 参数1：单元格位置
  - 参数2：单元格的值
- setCellValueByColumnAndRow
  - 参数1：列位置
  - 参数2：行位置
  - 参数3：单元格的值

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->setCellValue('A1','ID');
	$sheet->setCellValue('B1','姓名');
	$sheet->setCellValue('C1','年龄');
	$sheet->setCellValue('D1','身高');

	$sheet->setCellValueByColumnAndRow(1, 2, 1);
	$sheet->setCellValueByColumnAndRow(2, 2, '欧阳克');
	$sheet->setCellValueByColumnAndRow(3, 2, '18岁');
	$sheet->setCellValueByColumnAndRow(4, 2, '188cm');

	$sheet->setCellValueByColumnAndRow(1, 3, 2);
	$sheet->setCellValueByColumnAndRow(2, 3, '黄蓉');
	$sheet->setCellValueByColumnAndRow(3, 3, '17岁');
	$sheet->setCellValueByColumnAndRow(4, 3, '165cm');

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

### 2、单元格文字样式

- getStyle 获取单元格样式
- getFont 获取单元格文字样式
- setBold 设置文字粗细
- setName 设置文字字体
- setSize 设置文字大小

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->setCellValue('A1','ID');
	$sheet->setCellValue('B1','姓名');
	$sheet->setCellValue('C1','年龄');
	$sheet->setCellValue('D1','身高');

	$sheet->setCellValueByColumnAndRow(1, 2, 1);
	$sheet->setCellValueByColumnAndRow(2, 2, '欧阳克');
	$sheet->setCellValueByColumnAndRow(3, 2, '18岁');
	$sheet->setCellValueByColumnAndRow(4, 2, '188cm');

	$sheet->setCellValueByColumnAndRow(1, 3, 2);
	$sheet->setCellValueByColumnAndRow(2, 3, '黄蓉');
	$sheet->setCellValueByColumnAndRow(3, 3, '17岁');
	$sheet->setCellValueByColumnAndRow(4, 3, '165cm');

	$sheet->getStyle('B2')->getFont()->setBold(true)->setName('宋体')->setSize(20);

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

### 3、单元格文字颜色

- getColor() 获取坐标颜色
- setRGB() 设置字体颜色
- getRGB() 获取字体颜色
- setARGB() 设置字体颜色
- getARGB() 获取字体颜色

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->setCellValue('A1','ID');
	$sheet->setCellValue('B1','姓名');
	$sheet->setCellValue('C1','年龄');
	$sheet->setCellValue('D1','身高');

	$sheet->setCellValueByColumnAndRow(1, 2, 1);
	$sheet->setCellValueByColumnAndRow(2, 2, '欧阳克');
	$sheet->setCellValueByColumnAndRow(3, 2, '18岁');
	$sheet->setCellValueByColumnAndRow(4, 2, '188cm');

	$sheet->setCellValueByColumnAndRow(1, 3, 2);
	$sheet->setCellValueByColumnAndRow(2, 3, '黄蓉');
	$sheet->setCellValueByColumnAndRow(3, 3, '17岁');
	$sheet->setCellValueByColumnAndRow(4, 3, '165cm');

	$sheet->getStyle('B2')->getFont()->getColor()->setRGB('#AEEEEE');
	echo $sheet->getStyle('B2')->getFont()->getColor()->getRGB(),PHP_EOL;

	$sheet->getStyle('B3')->getFont()->getColor()->setARGB('FFFF0000');
	echo $sheet->getStyle('B3')->getFont()->getColor()->getARGB();

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

### 4、单元格格式

- getNumberFormat 获取格式
- setFormatCode 设置格式

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->setCellValue('A1','2019-10-10 10:10:10');
	$sheet->setCellValue('A2','2019-10-10 10:10:10');
	$sheet->getStyle('A2')->getNumberFormat()->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_DATE_YYYYMMDD2);

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

- setWrapText 设置文本里的\n符合为：换行

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->setCellValue('A1',"欧阳克\n黄蓉");
	$sheet->getStyle('A1')->getAlignment()->setWrapText(true);

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

- getHyperlink 获取单元格链接
- setUrl 设置单元格链接

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->setCellValue('A1','www.php.cn');
	$sheet->getCell('A1')->getHyperlink()->setUrl('http://www.php.cn');

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

------

## 四、批量操作

### 1、使用公式

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->setCellValue('A1','10');
	$sheet->setCellValue('B1','15');
	$sheet->setCellValue('C1','20');
	$sheet->setCellValue('D1','25');
	$sheet->setCellValue('E1','30');
	$sheet->setCellValue('G1','35');
	$sheet->setCellValue('A2', '总数：');
	$sheet->setCellValue('B2', '=SUM(A1:G1)');
	$sheet->setCellValue('A3', '平均数：');
	$sheet->setCellValue('B3', '=AVERAGE(A1:G1)');
	$sheet->setCellValue('A4', '最小数：');
	$sheet->setCellValue('B4', '=MIN(A1:G1)');
	$sheet->setCellValue('A5', '最大数：');
	$sheet->setCellValue('B5', '=MAX(A1:G1)');
	$sheet->setCellValue('A6', '最大数：');
	$sheet->setCellValue('B6', '\=MAX(A1:G1)');	// 使用转义字符

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

### 2、批量赋值

- fromArray 从数组中的值填充工作表
  - 参数1：数据(数组)
  - 参数2：去除某个值
  - 参数3：从哪个位置开始

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->setCellValue('A1','ID');
	$sheet->setCellValue('B1','姓名');
	$sheet->setCellValue('C1','年龄');
	$sheet->setCellValue('D1','身高');

	$sheet->fromArray(
		[
			[1,'欧阳克','18岁','188cm'],
			[2,'黄蓉','17岁','165cm'],
			[3,'郭靖','21岁','180cm']
		],
		3,
		'A2'
	);

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

### 3、合并单元格

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->mergeCells('A1:B5');

	$sheet->getCell('A1')->setValue('欧阳克');

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

> [info] 注：合并后，赋值只能给A1，开始的坐标。

### 4、拆分单元格

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->mergeCells('A1:B5');

	$sheet->unmergeCells('A1:B5');

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

### 5、列和行操作

- getColumnDimension 获取一列
- getWidth 获取一列的宽度
- setWidth 设置一列的宽度
- setAutoSize 设置一列的宽度自动调整
- getDefaultColumnDimension 获取一列的默认值

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	echo $sheet->getColumnDimension('A')->getWidth();

	$sheet->getColumnDimension('A')->setWidth(100);

	$sheet->getColumnDimension('B')->setAutoSize(true);

	$sheet->getDefaultColumnDimension()->setWidth(1);

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

- getRowDimension 获取一行
- getRowHeight 获取一行的高度
- setRowHeight 设置一行的高度

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	echo $sheet->getRowDimension(1)->getRowHeight();

	$sheet->getRowDimension(1)->setRowHeight(100);

	$sheet->getDefaultRowDimension()->setRowHeight(1);

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

- getHighestColumn 获取总列数
- getHighestRow 获取总行数

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->setCellValue('A1','ID');
	$sheet->setCellValue('B1','姓名');
	$sheet->setCellValue('C1','年龄');
	$sheet->setCellValue('D1','身高');

	$sheet->setCellValueByColumnAndRow(1, 2, 1);
	$sheet->setCellValueByColumnAndRow(2, 2, '欧阳克');
	$sheet->setCellValueByColumnAndRow(3, 2, '18岁');
	$sheet->setCellValueByColumnAndRow(4, 2, '188cm');

	$sheet->setCellValueByColumnAndRow(1, 3, 2);
	$sheet->setCellValueByColumnAndRow(2, 3, '黄蓉');
	$sheet->setCellValueByColumnAndRow(3, 3, '17岁');
	$sheet->setCellValueByColumnAndRow(4, 3, '165cm');

	echo $sheet->getHighestColumn();
	echo $sheet->getHighestRow();

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

### 6、单元格样式

- applyFromArray

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->setCellValue('A1','ID');
	$sheet->setCellValue('B1','姓名');
	$sheet->setCellValue('C1','年龄');
	$sheet->setCellValue('D1','身高');

	$sheet->setCellValueByColumnAndRow(1, 2, 1);
	$sheet->setCellValueByColumnAndRow(2, 2, '欧阳克');
	$sheet->setCellValueByColumnAndRow(3, 2, '18岁');
	$sheet->setCellValueByColumnAndRow(4, 2, '188cm');

	$styleArray = [
		// use PhpOffice\PhpSpreadsheet\Style\Alignment; 文件里常量，就是参数
		// Alignment::HORIZONTAL_CENTER 水平居中
		// Alignment::VERTICAL_CENTER	垂直居中
		'alignment' => [
			// 'horizontal' => Alignment::HORIZONTAL_CENTER, //水平居中
			// 'vertical' => Alignment::VERTICAL_CENTER, //垂直居中
			'horizontal' => 'center', //水平居中
			'vertical' => 'center', //垂直居中
		],
		// use PhpOffice\PhpSpreadsheet\Style\Border; 文件里常量，就是参数
		// Border::BORDER_THICK 边框样式
		'borders' => [
			'outline' => [
				// 'borderStyle' => '\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK',
				'borderStyle' => 'thick',
				'color' => ['argb' => 'FFFF0000'],
			],
		],
		'font' => [
			'name' => '黑体',
			'bold' => true,
			'size' => 22
		]
	];

	$sheet->getStyle('A1')->applyFromArray($styleArray);

	# Xlsx类 将电子表格保存到文件
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	$writer = new Xlsx($spreadsheet);
	$writer->save('1.xlsx');
```

------

## 五、工作薄操作

### 1、xlsx 文件下载

- IOFactory::createWriter 写入到文件

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->setCellValue('A1','ID');
	$sheet->setCellValue('B1','姓名');
	$sheet->setCellValue('C1','年龄');
	$sheet->setCellValue('D1','身高');

	$sheet->setCellValueByColumnAndRow(1, 2, 1);
	$sheet->setCellValueByColumnAndRow(2, 2, '欧阳克');
	$sheet->setCellValueByColumnAndRow(3, 2, '18岁');
	$sheet->setCellValueByColumnAndRow(4, 2, '188cm');

	// MIME 协议，文件的类型，不设置，会默认html
	header('Content-Type:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
	// MIME 协议的扩展
	header('Content-Disposition:attachment;filename=1.xlsx');
	// 缓存控制
	header('Cache-Control:max-age=0');

	$writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
	// php://output 它是一个只写数据流, 允许你以 print 和 echo一样的方式写入到输出缓冲区。 
	$writer->save('php://output');
```

### 2、xls 文件下载

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->setCellValue('A1','ID');
	$sheet->setCellValue('B1','姓名');
	$sheet->setCellValue('C1','年龄');
	$sheet->setCellValue('D1','身高');

	$sheet->setCellValueByColumnAndRow(1, 2, 1);
	$sheet->setCellValueByColumnAndRow(2, 2, '欧阳克');
	$sheet->setCellValueByColumnAndRow(3, 2, '18岁');
	$sheet->setCellValueByColumnAndRow(4, 2, '188cm');

	$filename = '1.xls';
	header('Content-Type:application/vnd.ms-excel');
	header('Content-Disposition:attachment;filename=1.xls');
	header('Cache-Control:max-age=0');

	$writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xls');
	$writer->save('php://output');
```

### 3、设置工作簿标题

- setTitle

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';
	# 给类文件的命名空间起个别名
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	# 实例化 Spreadsheet 对象
	$spreadsheet = new Spreadsheet();
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	$sheet->setCellValue('A1','ID');
	$sheet->setCellValue('B1','姓名');
	$sheet->setCellValue('C1','年龄');
	$sheet->setCellValue('D1','身高');

	$sheet->setCellValueByColumnAndRow(1, 2, 1);
	$sheet->setCellValueByColumnAndRow(2, 2, '欧阳克');
	$sheet->setCellValueByColumnAndRow(3, 2, '18岁');
	$sheet->setCellValueByColumnAndRow(4, 2, '188cm');

	$sheet->setTitle('欧阳克');

	// MIME 协议，文件的类型，不设置，会默认html
	header('Content-Type:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
	// MIME 协议的扩展
	header('Content-Disposition:attachment;filename=1.xlsx');
	// 缓存控制
	header('Cache-Control:max-age=0');

	$writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
	// php://output 它是一个只写数据流, 允许你以 print 和 echo一样的方式写入到输出缓冲区。 
	$writer->save('php://output');
```

### 4、读取表格

```php
<?php
	# 载入composer自动加载文件
	require 'vendor/autoload.php';

	# 创建读操作
	$reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader('Xlsx');
	# 打开文件、载入excel表格
	$spreadsheet = $reader->load('1.xlsx');
	# 获取活动工作薄
	$sheet = $spreadsheet->getActiveSheet();

	# 获取 单元格值 和 坐标
	$cellC1 = $sheet->getCell('B2');
	echo '值: ', $cellC1->getValue(),PHP_EOL;
	echo  '坐标: ', $cellC1->getCoordinate(),PHP_EOL;

	$sheet->setCellValue('B2','欧阳锋');

	# 获取 单元格值 和 坐标
	$cellC2 = $sheet->getCell('B2');
	echo '值: ', $cellC2->getValue(),PHP_EOL;
	echo  '坐标: ', $cellC2->getCoordinate();
```

------

## 六、office 后缀对应的 content-type

| **后缀** | **MIME Type**                                                |
| -------- | ------------------------------------------------------------ |
| .doc     | application/msword                                           |
| .dot     | application/msword                                           |
| .docx    | application/vnd.openxmlformats-officedocument.wordprocessingml.document |
| .dotx    | application/vnd.openxmlformats-officedocument.wordprocessingml.template |
| .docm    | application/vnd.ms-word.document.macroEnabled.12             |
| .dotm    | application/vnd.ms-word.template.macroEnabled.12             |
| .xls     | application/vnd.ms-excel                                     |
| .xlt     | application/vnd.ms-excel                                     |
| .xla     | application/vnd.ms-excel                                     |
| .xlsx    | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet |
| .xltx    | application/vnd.openxmlformats-officedocument.spreadsheetml.template |
| .xlsm    | application/vnd.ms-excel.sheet.macroEnabled.12               |
| .xltm    | application/vnd.ms-excel.template.macroEnabled.12            |
| .xlam    | application/vnd.ms-excel.addin.macroEnabled.12               |
| .xlsb    | application/vnd.ms-excel.sheet.binary.macroEnabled.12        |
| .ppt     | application/vnd.ms-powerpoint                                |
| .pot     | application/vnd.ms-powerpoint                                |
| .pps     | application/vnd.ms-powerpoint                                |
| .ppa     | application/vnd.ms-powerpoint                                |
| .pptx    | application/vnd.openxmlformats-officedocument.presentationml.presentation |
| .potx    | application/vnd.openxmlformats-officedocument.presentationml.template |
| .ppsx    | application/vnd.openxmlformats-officedocument.presentationml.slideshow |
| .ppam    | application/vnd.ms-powerpoint.addin.macroEnabled.12          |
| .pptm    | application/vnd.ms-powerpoint.presentation.macroEnabled.12   |
| .potm    | application/vnd.ms-powerpoint.presentation.macroEnabled.12   |
| .ppsm    | application/vnd.ms-powerpoint.slideshow.macroEnabled.12      |

